require('dotenv').config({ path: './.env_node'})

const mongoose = require('mongoose')
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');


const app = require('./express')
const port=process.env.PORT || 3000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,options));

const userRouter = require('./src/routers/user')
const articleRouter = require('./src/routers/article')


app.use('/user',userRouter);
app.use('/api/v1',articleRouter)


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