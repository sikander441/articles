require('dotenv').config()
const app = require('./express')
const mongoose = require('mongoose')


const port=process.env.PORT || 3000

const userRouter = require('./src/routers/user')
app.use('/user',userRouter);

mongoose.connection.on('connected', () => {
  
    console.log('info','Connected to Mongo DB, Starting server now.')
    app.listen(port,(err) => {
      if(err)
       console.log(err)
      else {
        console.log('Server Started at port '+port)
      }
    }).on('error',(e)=>{
     console.log(e);
      mongoose.connection.close()
    })
  
  
  });