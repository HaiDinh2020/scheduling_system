require('dotenv').config()
module.exports = {
  "development": {
    "username": "root",
    "password": "m@tKhaumysql",
    "database": "datn2",
    "host": "localhost",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "datn2",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3307"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3307"
  }
}
