module.exports = {
    "development": {
      "database": process.env.MONGO_DEV_DBNAME,
      "host": process.env.MONGO_DEV_HOST,
    },
    "production": {
      "username": process.env.MONGO_PROD_USER,
      "password": process.env.MONGO_PROD_KEY,
      "database": process.env.MONGO_PROD_DBNAME,
      "host": process.env.MONGO_PROD_HOST,
    },
  }