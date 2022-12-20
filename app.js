const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const { User } = require('./models');
const bcrypt = require('bcrypt');
// const crypto = require('crypto');

const salt = 12;
//회원가입 데이터
let userDatas = [];

//force: false는 모델을 수정해도 db반영 x
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB Connected Success');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use(express.static(path.join(__dirname, '/variousproj/build')));

app.use(cors());

//메인페이지 접속시 build 폴더의 index.html을 보내줘!
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/variousproj/build/index.html'));
});

app.post('/signUp', async (req, res) => {
  let sendData = '';

  userDatas = req.body.signUpDatas;
  const hashPassword = await bcrypt.hash(userDatas[2], salt);

  // let hashPassword = crypto
  //   .createHash('sha512')
  //   .update(userDatas[2] + salt)
  //   .digest('hex');

  User.create({
    nameuser: userDatas[0],
    emailuser: userDatas[1],
    passworduser: hashPassword,
  })
    .then((result) => {
      console.log('저장 성공:', result);
      sendData = 'success';
      res.send(sendData);
    })
    .catch((err) => {
      console.log(err);
      sendData = 'fail';
      res.send(sendData);
    });
  console.log(userDatas);
});

//라우팅은 리액트가 담당하도록 설계한다.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/variousproj/build/index.html'));
});

http.listen(8080, () => {
  console.log('Listening on 8080');
});
