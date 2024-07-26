const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    logging: false,
    timezone: '+07:00',
  },

);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

sequelize.sync({ force: true }) // Use force: true only in development to drop and recreate tables.
  .then(() => {
    console.log('Database & tables created!');
  });

module.exports = connectDatabase;