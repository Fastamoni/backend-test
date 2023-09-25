const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY
require('dotenv').config()

module.exports.generateToken = function (user) {
  const payload ={ 
    id: user.id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}


module.exports.authenticateToken = function (req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send('Access denied. Token not provided.');
  }
  const token = req.header('Authorization').split(" ")[1];
  if (!token) {
    return res.status(401).send('Access denied. Token not provided.');
 } 

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Access denied. Invalid token.');
    }

    req.user = user;
    next();
  });
}