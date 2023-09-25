

const { Sequelize } = require('sequelize');

class DatabaseService {
  constructor() {
    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
      port:process.env.DB_PORT

    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async synchronizeAllModelsWithDatabase(models) {
    try {
      for (const model of models) {
        await model.sync();
        console.log(`${model.name} table has been synchronized.`);
      }
    } catch (error) {
      console.error('Error synchronizing models with the database:', error);
      throw error;
    }
  }

  getSequelizeInstance() {
    return this.sequelize;
  }

  async close() {
    await this.sequelize.close();
    console.log('Database connection has been closed.');
  }
}

module.exports = DatabaseService;