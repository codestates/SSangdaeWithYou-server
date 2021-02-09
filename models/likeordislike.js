'use strict';
const { Model } = require('sequelize');
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

