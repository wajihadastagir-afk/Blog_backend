const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

// Index for search functionality
postSchema.index({ title: 'text', content: 'text', 'author.name': 'text' });

// Ensure consistent id fields in JSON responses
postSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    if (ret.author && ret.author.id) {
      ret.author.id = String(ret.author.id);
    }
    if (Array.isArray(ret.comments)) {
      ret.comments = ret.comments.map((c) => {
        const comment = { ...c };
        comment.id = comment._id;
        delete comment._id;
        if (comment.author && comment.author.id) {
          comment.author.id = String(comment.author.id);
        }
        return comment;
      });
    }
    return ret;
  }
});

module.exports = mongoose.model('Post', postSchema);
