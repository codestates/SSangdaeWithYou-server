'use strict';

require("dotenv").config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { user, smokePlace, message, likeOrDislike } = sequelize.models;

// //! 일 대 다 please
user.hasMany(smokePlace); 
smokePlace.belongsTo(user);

// user.belongsToMany(smokePlace, { through: likeOrDislike }); 
// smokePlace.belongsToMany(user, { through: likeOrDislike }); 

user.hasMany(likeOrDislike);
likeOrDislike.belongsTo(user);
smokePlace.hasMany(likeOrDislike);
likeOrDislike.belongsTo(smokePlace);

// user.hasMany(likeOrDislike);
// likeOrDislike.belongsTo(user, { foreignKey: 'userId' });
// smokePlace.hasMany(likeOrDislike);
// likeOrDislike.belongsTo(smokePlace, { foreignKey: 'smokePlaceId' });

user.hasMany(message);
message.belongsTo(user);
smokePlace.hasMany(message);
message.belongsTo(smokePlace);


// user.belongsToMany(smokePlace, { through: messages });
// smokePlace.belongsToMany(user, { through: messages });

// messages.belongsTo(user, { foreignKey: 'messages_users_fk' });
// messages.belongsTo(smokePlace, { foreignKey: 'messages_smoke_fk'});

module.exports = db;
