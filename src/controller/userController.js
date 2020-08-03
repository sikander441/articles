const userModel = require('../models/User')
const {errorCodes} = require('../constants')
const bcrypt = require('bcrypt')


const login  = async (email,password) => {

  if(!email || !password)
   throw errorCodes.ARGUMENTSMISSING

  let user = await userModel.findOne({ email });
  if (!user)
  {
     
      throw errorCodes.USERNOTFOUND
  }
  if(bcrypt.compareSync(password, user.password))
  {
        const token = user.generateAuthToken();
        return token;
  }
  else
   throw errorCodes.PASSWORDINCORRECT

}

const signUp = async (email, password ,firstName , lastName, isAdmin) => {


    if(!email || !password || !firstName || !lastName)
        throw errorCodes.ARGUMENTSMISSING

    let user = await userModel.findOne({ email });
    if (user) 
     throw errorCodes.USEREXISTS

    user = new userModel({
        email,
        password,
        FirstName:firstName,
        LastName:lastName,
        isAdmin
    });

    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    const token = user.generateAuthToken();

    return token;
}

const getUserById = async (_id) =>{
    if( !_id )
     throw errorCodes.ARGUMENTSMISSING
    
    return await userModel.findById(_id).select("-password");
}

module.exports = {
    login,
    signUp,
    getUserById
}