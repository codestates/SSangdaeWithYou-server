require('dotenv').config();
module.exports = {
  "development": {
    "username": "sosick0418",
    "password": process.env.DATABASE_PASSWORD,
    "database": "first-project-database",
    "host": "first-project-database.cvzikveoyguc.us-east-2.rds.amazonaws.com",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
