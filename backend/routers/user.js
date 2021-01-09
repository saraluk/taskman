const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account');
const router = new express.Router();

// @desc    user sign up
// @route   POST /api/users
// @access  Public
router.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  const { email } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user, token: token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// @desc    user login
// @route   POST /api/users/login
// @access  Public
router.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user: user, token: token });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// @desc    user logout the current session
// @route   POST /api/users/logout
// @access  Private
router.post('/api/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// @desc    user logout all sessions
// @route   POST /api/users/logoutAll
// @access  Private
router.post('/api/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

// @desc    get user's profile
// @route   GET /api/users/me
// @access  Private
router.get('/api/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// @desc    update user's profile by id
// @route   PATCH /api/users/me
// @access  Private
router.patch('/api/users/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      res.send({
        token: req.token,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// @desc    delete user by id
// @route   DELETE /api/users/me
// @access  Private
router.delete('/api/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (
      !(
        file.originalname.endsWith('.jpg') ||
        file.originalname.endsWith('.jpeg') ||
        file.originalname.endsWith('.png')
      )
    ) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  },
});

// @desc    upload user's profile picture
// @route   POST /api/users/me/avatar
// @access  Private
router.post(
  '/api/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// @desc    delete user's profile picture
// @route   DELETE /api/users/me/avatar
// @access  Private
router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

// @desc    get user's profile picture
// @route   GET /api/users/:id/avatar
// @access  Public
router.get('/api/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set('Content-type', 'image/png');
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
