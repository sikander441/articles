module.exports = function(req, res, next) {

    const user = req.user;
    if( !user )
     return res.status(401).send({status:'failure',message:'Log in first'})
    if(user.isAdmin)
     return next()

    res.status(403).send({status:'failure',message:'Sorry only admin is allowed'})
    
     
  };