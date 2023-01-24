const express = require('express');
const { User, Board } = require('../models');
const multer = require('multer');
const asyncify = require('express-asyncify');
const router = asyncify(express.Router());
const path = require('path');

router.patch('/:id', (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let score = req.body.score;

  Board.update(
    {
      boardTitle: title,
      boardContent: content,
      boardScore: score,
    },
    { where: { boardId: req.params.id } }
  ).then(() => {
    res.json('수정 성공');
  });
});

module.exports = router;
