const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const { User } = require('./models');
const bcrypt = require('bcrypt');
const { send } = require('process');
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

app.post('/', async (req, res) => {
  let sendData = '';
  const clientLogin = req.body.loginDatas;
  // console.log(clientLogin);

  const userDataCheck = await User.findOne({
    where: { emailuser: clientLogin[0] },
  });

  if (userDataCheck === null) {
    sendData = 'fail';
    res.send(sendData);
  } else {
    const match = await bcrypt.compare(
      clientLogin[1],
      userDataCheck.passworduser
    );

    if (match === true) {
      sendData = 'success';
      res.send(sendData);
    } else if (match === false) {
      sendData = 'fail';
      res.send(sendData);
    }
  }
  // 이메일이  없으면 null값으로 나온다.
  // console.log('조회된 데이터는 ?', userDataCheck);
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
});

//라우팅은 리액트가 담당하도록 설계한다.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/variousproj/build/index.html'));
});

http.listen(8080, () => {
  console.log('Listening on 8080');
});
