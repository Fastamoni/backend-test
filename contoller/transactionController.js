const { validationResult } = require('express-validator')

class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService
    }
    async postCreateTransaction(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const { pin, amount, beneficiary_id } = req.body
            const user = req.user
            let result = await this.transactionService.postCreateTransaction(pin, amount, beneficiary_id, user)
            res.json({ message: `Donation to ${result.bene} successful`, transaction: result.transac });

        } catch (error) {
            res.status(401).json({ error: error.message });

        }

    }

    async getSingleTransaction(req, res) {
        try {
            const { id } = req.params
            let transaction = await this.transactionService.getSingleTransaction(id)
            res.json({ transaction });

        } catch (error) {
            res.status(401).json({ error: error.message });

        }
    }
    async getAllTransaction(req, res) {
        try {
            const { startDate, endDate } = req.body
            let transactions = await this.transactionService.getAllTransaction(startDate, endDate)
            res.json({ transactions });

        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
    async getTransactionCount(req, res) {
        try {
            const user = req.user
            let count = await this.transactionService.getTransactionCount(user)
            res.json({ Donation: count });

        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = TransactionController