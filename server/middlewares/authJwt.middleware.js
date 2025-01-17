const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Access Forbidden!!" });
    req.userId = decoded.id;
    req.username = decoded.username;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;
