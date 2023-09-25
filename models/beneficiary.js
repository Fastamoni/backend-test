const { Sequelize, DataTypes, Model } = require('sequelize')
const DatabaseService = require('../utils/db')
const Transaction = require('./transactions')
const dbService = new DatabaseService();
const sequelize = dbService.getSequelizeInstance();
class Beneficiary extends Model { }

Beneficiary.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
    modelName: 'Beneficiary'
})
Beneficiary.hasMany(Transaction, { foreignKey: 'benId' });
Transaction.belongsTo(Beneficiary, { foreignKey: 'benId' });

module.exports = Beneficiary 