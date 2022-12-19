const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const { User } = require('./models');

//force: false는 모델을 수정해도 db반영 x
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB Connected Success');
  })
  .catch((err) => {
    console.error(err);
  });

// User.create({
//   nameuser: '선경',
//   emailuser: 'sunny@naver.com',
//   passworduser: 'qedsa212',
// })
//   .then((result) => {
//     console.log('저장 성공:', result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

User.destroy({ where: { nameuser: '봉희' } });
// User.findAll().then(console.log);
app.use(express.json());

app.use(express.static(path.join(__dirname, '/variousproj/build')));

app.use(cors());

//메인페이지 접속시 build 폴더의 index.html을 보내줘!
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/variousproj/build/index.html'));
});

app.post('/signUp', (req, res) => {
  let datas = req.body.signUpDatas;
  console.log(datas);
});

//라우팅은 리액트가 담당하도록 설계한다.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/variousproj/build/index.html'));
});

http.listen(8080, () => {
  console.log('Listening on 8080');
});
