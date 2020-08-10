const mongoose = require('mongoose')


mongoose.connection.on('error',err=>{
  console.log('Failed to connect to mongo DB server ',err)
});
mongoose.connection.on('connecting',()=>{
  console.log('Connecting to database server :' + process.env.DB_URL)
});


openConnection = async () =>
{
  mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology : true}).catch((err)=>{
    console.log('Failed to connect to database ',err)
  })
}
module.exports = {
  openConnection
}