const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const articleSchema = new mongoose.Schema({
 
    Title: String,
    img : {
        data: Buffer,
        contentType: String
    },
    Content:String,
    isFeatured:Boolean,
    Topic:{
        type:mongoose.ObjectId,
        ref:"Topic"
    },
    views:{
        type:Number,
        default: 0
    }
  });
  

  var articleModel = mongoose.model('Articles',articleSchema)

  module.exports = articleModel