const User = require("../models/user")
const Transaction = require("../models/transactions")
const Beneficiary = require("../models/beneficiary")
const Sequelize = require('sequelize');

class TransactionService {

    async postCreateTransaction(pin, amount, beneficiary_id, user) {
        const findUser = await User.findOne({ where: { email: user.email } });
        const findBen = await Beneficiary.findOne({ where: { id: beneficiary_id } })
        if (!findBen) {
            throw new Error('beneficiary doesnt exist.');
        }
        if (!findUser) {
            throw new Error('user doesnt exist.');
        }
        if (amount > findUser.wallet) {
            throw new Error('insufficient funds.');
        }
        if (amount == 0) {
            throw new Error('not allowed.');
        }
        if (pin !== findUser.pin || findUser.pin == "") {
            throw new Error('incorrect pin.');
        }
        findUser.wallet = parseFloat(findUser.wallet) - parseFloat(amount)
        findUser.save()
        let transac = await Transaction
            .create({
                amount,
                userId: findUser.id,
                benId: beneficiary_id
            })
        return { transac, bene: findBen.name }
    }
    async getSingleTransaction(id) {
        let transaction = await Transaction.findOne({
            where: { id: id },
            include: [{
                model: User,
            }, {
                model: Beneficiary,

            }]
        })
        if (!transaction) {
            throw new Error('transaction does not exist.');
        }
        return transaction
    }
    async getAllTransaction(startDate, endDate) {
        const page = 1;
        const pageSize = 10;
        const StartDate = new Date(startDate);
        const EndDate = new Date(endDate);
        const offset = (page - 1) * pageSize;
        const result = await Transaction.findAndCountAll({
            where: {
                createdAt: {
                    [Sequelize.Op.between]: [StartDate, EndDate],
                },

            },
            include: [{
                model: User,
            }, {
                model: Beneficiary,

            }],
            offset: offset,
            limit: pageSize,
            order: [['createdAt', 'DESC']],
        });
        if (!result) {
            throw new Error('no records found.');
        }
        const transactions = result.rows;
        const totalItems = result.count;


        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            transactions: transactions,
            currentPage: page,
            pageSize: pageSize,
            totalItems: totalItems,
            totalPages: totalPages,
        };

    }
    async getTransactionCount(user) {
        const findUser = await User.findOne({ where: { email: user.email } });

        let result = await Transaction.findAndCountAll({
            where: { userId: findUser.id },
            include: [{
                model: User,
            }, {
                model: Beneficiary,

            }],
        })
        if (!findUser) {
            throw new Error('Invalid user.');
        }
        if (result.count <= 0) {
            throw new Error('no records found.');
        }
        return result
    }
}
module.exports = TransactionService