const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.headers["x-access-token"] || req.headers["authorization"] || req.cookies['token'];
  if (!token){
    req.loggedIn = false
    return next()
  }
  try {
    const decoded = jwt.verify(token, process.env.myprivatekey);
    req.user = decoded;
    req.loggedIn = true;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};