const express = require('express');
const mongoose = require('mongoose');
const CommentModel = require('../schemas/comment-model');
const router = express.Router();

// Get comments
router.get('/', async (req, res) => {
  try {
    const comments = await CommentModel.find();
    res.status(200).send(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Comment
router.post('/', async (req, res) => {
  try {
      const newComment = new CommentModel({
          _id: new mongoose.Types.ObjectId(),
          ...req.body
      });
      const addedComment = await newComment.save();
      res.status(200).json(addedComment);
  } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
});

// Delete Comment 
router.delete("/:id", async function (req, res) {
  try {
      const currComment = await CommentModel.findByIdAndDelete(req.params.id);
      if (!currComment) return res.status(404).json({ message: 'Comment Not Found' });
      res.status(200).json("Comment Deleted Successfully");
  } catch (err) {
      res.status(500).send(err);
  }
});

module.exports = router;
