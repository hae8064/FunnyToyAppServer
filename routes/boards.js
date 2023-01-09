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

//로그인 한 user id에 따른 DB 메모 정보 클라이언트로 전송
router.get('/:id', async (req, res, next) => {
  const userId = Number(req.params.id.split(':')[1].split('}')[0]);

  const boards = await Board.findAll({ where: { boarder: userId } });

  res.json(boards);
});

router.post('/create', upload.single('imgFile'), async (req, res, next) => {
  boardData = req.body.createPostDB;
  console.log('id는?', req.body);

  Board.create({
    boardTitle: boardData[0],
    boardContent: boardData[1],
    boardScore: boardData[2],
    boardLocation: boardData[3],
    boarder: boardData[4],
  }).then((result) => {
    res.send(result);
    console.log('저장성공:', result);
  });

  try {
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//메모 삭제 api
router.delete('/delete', async (req, res, next) => {
  for (let id of req.body.boardId) {
    Board.destroy({
      where: { boardId: id },
    })
      .then((result) => console.log('삭제성공:', result))
      .catch((err) => console.log(err));
  }
  // Board.destroy({
  //   where: { boardId: req.body.boardId },
  // })
  //   .then((result) => console.log('삭제 성공: ', result))
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

module.exports = router;
