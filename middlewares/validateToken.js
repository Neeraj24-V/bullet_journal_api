const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  // console.log(token)
  if (!token) {
    res.sendStatus(400);
    throw new Error("Missing token");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.sendStatus(401);
      throw new Error("User Not Authorised");
    }
    // console.log(decoded)
    // console.log(decoded);
    req.user = decoded.user;
    // console.log(req.user);
    next();
  });
};

module.exports = validateToken;
