require('dotenv').config();

const config = {
  emailUsername: process.env.NODEMAIL_EMAIL,
  emailPassword: process.env.NODEMAIL_PASSWORD,
  mysqlUser: process.env.MYSQL_USER,
  mysqlPassword: process.env.MYSQL_PASSWORD,
  mysqlHost: process.env.MYSQL_HOST,
  mysqlDatabase: process.env.MYSQL_DATABASE
};

module.exports = config;