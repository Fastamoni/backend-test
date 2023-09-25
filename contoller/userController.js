const { validationResult } = require('express-validator')
class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  async sayHello(req, res) {
    const result = await this.userService.sayHello();
    res.status(201).json(result);
  }
  async postRegister(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { email, password } = req.body;
      const user = await this.userService.postRegister(email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async postLogin(req, res) {
    try {
      const { email, password } = req.body;
      const token = await this.userService.postLogin(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async postCreatePin(req, res) {

    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { pin } = req.body
      const user = req.user
      let result = await this.userService.postCreatePin(pin, user);
      res.json({ message: "Pin created successfully " });
    } catch (error) {
      res.status(401).json({ error: error.message });

    }


  }

  async postCreateBeneficiary(req, res) {

    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { name } = req.body
      let bene = await this.userService.postCreateBeneficiary(name);
      res.json({ message: "Beneficiary created successfully", bene });
    } catch (error) {
      res.status(401).json({ error: error.message });

    }


  }
  async postDeposit(req, res) {
    try {
      const { amount } = req.body
      const user = req.user
      let result = await this.userService.postDeposit(amount, user);
      res.json({ message: "Amount deposited successfully", result });

    } catch (error) {
      res.status(401).json({ error: error.message });
    }

  }

  async postSendMail(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      const { to, subject, message } = req.body
      const user = req.user
      let result = await this.userService.postSendMail(user, to, subject, message);
      res.json({ message: "Message sent successfully" });

    } catch (error) {
      res.status(401).json({ error: error.message });
    }

  }

}
module.exports = UserController