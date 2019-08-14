module.exports = {
  development: {
    port: process.env.PORT || 5050,
    saltingRounds: 10,
    dbUrl: process.env.MONGO_LOCAL_URL,
  },
  production: {
    port: process.env.PORT || 5050,
    saltingRounds: 10,
    dbUrl: process.env.MONGO_LOCAL_URL,
  },
  test: {
    port: process.env.PORT || 5000,
    saltingRounds: 10,
    dbUrl: process.env.MONGO_TEST_URL,
  },
};
