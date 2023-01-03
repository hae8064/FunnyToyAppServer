const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        boardTitle: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        boardContent: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        boardScore: {
          type: INTEGER,
          allowNull: false,
        },
        boardLocation: {
          type: Sequelize.STRING(100),
        },
        boardImg: {
          type: Sequelize.STRING(500),
        },
        boardCreated: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
      },
      {
        sequelize,
        //timestamps: true면 자동으로 created_at과 updatedAt컬럼을 추가한다
        timestamps: false,
        underscored: false,
        //모델 이름을 설정한다. 노드 프로젝트에 사용한다.
        modelName: 'Board',
        //실제 디비의 테이블 이름이 된다. 기본적으로 모델 이름을 소문자 및 복수형으로 만든다.
        tableName: 'board',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }
  static associate(db) {
    db.Board.belongsTo(db.User, { foreignKey: 'boarder', targetKey: 'iduser' });
  }
};
