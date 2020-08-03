const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    FirstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    LastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
      },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255
    },
    isAdmin: {
      type:Boolean,
      default:false
    }
  });
  
  UserSchema.methods.generateAuthToken = function() { 

    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.myprivatekey,{expiresIn:'5m'});
    return token;
  }
  
  var userModel = mongoose.model('Users',UserSchema)

  module.exports = userModel