const User = require("../models/user")
const Beneficiary = require("../models/beneficiary")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../middleware/middleware")
const transporter = require('../utils/email')
class UserService {
  async sayHello(req, res) {
    return "Hello server working"
  }
  async postRegister(email, password) {
    const findUser = await User.findOne({ where: { email: email } });

    if (findUser) {
      throw new Error(`${email} already exist.`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });
    return user;
  }

  async postLogin(email, password) {
    const user = await User.findOne({ where: { email: email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password.');
    }

    const token = generateToken(user);
    return token;
  }
  async postCreatePin(pin, user) {
    const findUser = await User.findOne({ where: { email: user.email } });
    if (!findUser) {
      throw new Error('Invalid user.');
    }

    findUser.pin = pin
    await findUser.save()
    return findUser
  }
  async postCreateBeneficiary(name) {
    const findBen = await Beneficiary.findOne({ where: { name: name } })
    if (findBen) {
      throw new Error('beneficiary already exist.');
    }
    let bene = await Beneficiary.create({ name })
    return bene
  }
  async postDeposit(amount, user) {
    const findUser = await User.findOne({ where: { email: user.email } });
    if (!findUser) {
      throw new Error(`user doesnt exist.`);
    }
    findUser.wallet = parseFloat(findUser.wallet) + parseFloat(amount)
    findUser.save()
    return findUser
  }
  async postSendMail(user, to, subject, message) {
    const findUser = await User.findOne({ where: { email: user.email } });

    const mailData = {
      from: `${findUser.email}`,
      to: `${to}`,
      subject: `${subject}`,
      text: `${message}`,
    };

    // Send the email
    transporter.sendMail(mailData, (error, info) => {
      if (error) {

        console.error('Error sending email:', error);
        return false
      } else {
        console.log('Email sent successfully:', info);
        return true
      }
    });
  }

}

module.exports = UserService;