require('dotenv').config();

const config = {
  emailUsername: process.env.NODEMAIL_EMAIL,
  emailPassword: process.env.NODEMAIL_PASSWORD
};

module.exports = config;