const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = new express.Router();

// @desc    create a task
// @route   POST /api/tasks
// @access  Private
router.post('/api/tasks', auth, async (req, res) => {
  const tagsArrObj = req.body.tags.map((tag) => ({ tag: tag }));
  const task = new Task({
    ...req.body,
    owner: req.user._id,
    tags: tagsArrObj,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// @desc    get multiple tasks created by a user
// @route   GET /api/tasks
// @access  Private
router.get('/api/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};

  // Check if completed is provided as part of query string in URL
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  // Check if sortBy is provided as part of query string in URL
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split('_');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1; // 1 is ascending order, -1 is descending order
  }

  try {
    await req.user
      .populate({
        path: 'tasks',
        match: match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// @desc    get an individual task by id
// @route   GET /api/tasks/:id
// @access  Private
router.get('/api/tasks/:id', auth, async (req, res) => {
  const _id = req.params._id;
  try {
    const task = await Task.findOne({ _id: _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// @desc    update an individual task by id
// @route   PATCH /api/tasks/:id
// @access  Private
router.patch('/api/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid update' });
  }

  const _id = req.params.id;
  try {
    // Adjustment to get mongoose pre() middleware to run
    const task = await Task.findOne({ _id: _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// @desc    delete an individual task by id
// @route   DELETE /api/tasks/:id
// @access  Private
router.delete('/api/tasks/:id', auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id: _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

// router.post('/api/tasks/tags', async (req, res) => {
//   const tag = new Tag(req.body)

//   try {
//     const existTag = await Tag.findOne({ tag })
//     if(existTag) {
//       res.send()
//     }

//     await tag.save()
//     res.status(201).send(tag)
//   } catch (e) {
//     res.status(400).send(e)
//   }
// })

module.exports = router;
