const express = require('express');
require('dotenv').config()

const UserController = require('./contoller/userController');
const UserService = require('./service/userService');
const TransactionService = require('./service/transactionService');
const TransactionController = require('./contoller/transactionController');
const DatabaseService = require('./utils/db')
const User = require("./models/user")
const Beneficiary = require("./models/beneficiary")
const Transaction = require("./models/transactions")
const {
  validateUserInput,
  validatePinInput,
  validateBenefInput,
  validateDepositInput,
  validateDonationInput,
  validateEmailInput
} = require("./validator/validation")
const { authenticateToken } = require("./middleware/middleware")
const app = express();
app.use(express.json());


const userService = new UserService();
const transactionService = new TransactionService()
const userController = new UserController(userService);
const transactionController = new TransactionController(transactionService);

// Routes

app.get('/', (req, res) => userController.sayHello(req, res));
app.post('/api/register', validateUserInput, (req, res) => userController.postRegister(req, res));
app.post('/api/login', (req, res) => userController.postLogin(req, res));
app.post('/api/create-pin', authenticateToken, validatePinInput, (req, res) => userController.postCreatePin(req, res));
app.post('/api/create-beneficiary', authenticateToken, validateBenefInput, (req, res) => userController.postCreateBeneficiary(req, res));
app.post('/api/deposit', authenticateToken, validateDepositInput, (req, res) => userController.postDeposit(req, res));
app.post('/api/send-mail', authenticateToken, validateEmailInput, (req, res) => userController.postSendMail(req, res));

app.post('/api/create-transaction', authenticateToken, validateDonationInput, (req, res) => transactionController.postCreateTransaction(req, res));
app.get('/api/transaction/:id', authenticateToken, (req, res) => transactionController.getSingleTransaction(req, res));
app.get('/api/transactions', authenticateToken, (req, res) => transactionController.getAllTransaction(req, res));
app.get('/api/transaction-amount', authenticateToken, (req, res) => transactionController.getTransactionCount(req, res));

const dbService = new DatabaseService();

// Connect to the database
dbService.connect()
  .then(async () => {
    // Synchronize all models with the database
    await dbService.synchronizeAllModelsWithDatabase([User, Beneficiary, Transaction]);
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });


// Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;