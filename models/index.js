const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
const User = require('./user');
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//db객체에 Sequelize패키지 넣기
//연결 객체를 나중에 재사용하기 위해 넣어준다.
db.sequelize = sequelize;

//db라는 객체에 User모델을 담았다. 앞으로 db객체를 require하여 User모델에
//접근할 수 있을것이다.
db.User = User;

//User.init메소드는 모델의 static.init메소드를 호출해 init이 실행돼야 테이블이 모델로 연결 된다.
//다른 테이블과의 관계를 연결하는 associate메소드 역시 미리 실행한다.
User.init(sequelize);

User.associate(db);

module.exports = db;
