const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const topicSchema = new mongoose.Schema({
    name : String,
    img : {
        data: Buffer,
        contentType: String
    },
  });
  

  var topicModel = mongoose.model('Topics',topicSchema)

  module.exports = topicModel