const { INTEGER, STRING } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        iduser: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          comment: '고유번호 uuid',
        },
        nameuser: {
          type: STRING(45),
          allowNull: false,
          unique: false,
        },
        emailuser: {
          type: STRING(45),
          allowNull: false,
          unique: true,
        },
        passworduser: {
          type: STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        //timestamps: true면 자동으로 created_at과 updatedAt컬럼을 추가한다
        timestamps: false,
        underscored: false,
        //모델 이름을 설정한다. 노드 프로젝트에 사용한다.
        modelName: 'User',
        //실제 디비의 테이블 이름이 된다. 기본적으로 모델 이름을 소문자 및 복수형으로 만든다.
        tableName: 'user',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {}
};
