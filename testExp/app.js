//express 모듈 불러오기
const express = require('express');

//express 사용
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/search/blog', (req, res) => {
  res.send({ title: 'Express 테스트 서버' });
});

app.listen(3000, () => console.log('테스트 서버'));
