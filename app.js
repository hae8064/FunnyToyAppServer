const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
//__dirname 선언
// const __dirame = path.resolve();

app.use(express.json());

app.use(express.static(path.join(__dirname, '/variousproj/build')));

app.use(cors());

//메인페이지 접속시 build 폴더의 index.html을 보내줘!
app.get('/', (res, req) => {
  req.sendFile(path.join(__dirname, '/variousproj/build/index.html'));
});

//라우팅은 리액트가 담당하도록 설계한다.
app.get('*', (res, req) => {
  req.sendFile(path.join(__dirname, '/variousproj/build/index.html'));
});

http.listen(8080, () => {
  console.log('Listening on 8080');
});
