const express = require('express');
const { User, Board } = require('../models');
const multer = require('multer');
const asyncify = require('express-asyncify');
const router = asyncify(express.Router());
const path = require('path');

//게시판 데이터
let boardData = [];

const storage = multer.diskStorage({
  destination: './public/imgs',
  filename: (req, file, cb) => {
    cb(null, 'imgFile' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

router.post('/create', upload.single('imgFile'), async (req, res, next) => {
  boardData = req.body.createPostDB;
  console.log('id는?', req.body);

  Board.create({
    boardTitle: boardData[0],
    boardContent: boardData[1],
    boardScore: boardData[2],
    boardLocation: boardData[3],
    boardImg: boardData[4],
  }).then((result) => {
    console.log('저장성공:', result);
  });

  try {
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
