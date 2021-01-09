const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  tag: {
    type: String,
  },
});

const taskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    dueDate: {
      type: Date,
    },
    tags: [tagSchema],
  },
  {
    timestamps: true,
  }
);

taskSchema.virtual('tag', {
  ref: 'Tag',
  localField: '_id',
  foreignField: 'task',
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
