module.exports = function(req, res, next) {

    const loggedIn = req.loggedIn;

    if( !loggedIn )
     return res.status(401).send({status:'failure',message:'Log in first'})
    else
     next()
    
  };