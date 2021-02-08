'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likeOrDislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  likeOrDislike.init({
    isLike: DataTypes.INTEGER,
    isDislike: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'likeOrDislike',
  });
  return likeOrDislike;
};

// User , place 의 모델 만듦 => 관계 설정 해주고 끝 => 마이그레이션 파일 만들고 createTable로 조인 테이블 만들고 외래키 설정도 해준다.
// db:migrate를 해주면 끝.