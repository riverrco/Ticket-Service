const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  PORT: process.env.PORT,
  SENTY: process.env.SENTY,
  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_DB: process.env.PG_DB,
  MONGO_USERNAME: process.env.MONGO_USERNAME,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_DB: process.env.MONGO_DB,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  REDIS_CLIENT: process.env.REDIS_CLIENT,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
};