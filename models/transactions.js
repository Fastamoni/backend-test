const { Sequelize, DataTypes, Model } = require('sequelize')
const DatabaseService = require('../utils/db')
const dbService = new DatabaseService();
const sequelize = dbService.getSequelizeInstance();
class Transaction extends Model { }
Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    modelName: 'Transaction'
})



module.exports = Transaction
