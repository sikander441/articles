const bcrypt = require("bcrypt");
const express = require("express");

const auth = require("../middleware/auth");
const userController = require('../controller/userController');
const { errorCodes } = require("../constants");


const router = express.Router();


router.post('/login',async (req,res) =>{

  let email = req.body.email;
  let password = req.body.password

  try{
    const token = await userController.login(email,password);
    res.send({status:'success',token})
  }catch(error){
      res.status(400).send({status:'failure',message:error.message})
  }
 
  
})

router.post('/signup' , async (req,res) => {

  let email = req.body.email
  let password = req.body.password
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let isAdmin = req.body.isAdmin

  try{
    const token = await userController.signUp(email,password,firstName,lastName, isAdmin)
    res.send({status:'success',message:'Sucesfully Signed up in', token})
  }catch(error)
  {
    res.status(400).send( {status:'failure',message:error.message} )
  }

})


router.get("/current", auth, async (req, res) => {
  console.log('here')
   try{

    const user = await userController.getUserById(req.user._id)
    res.send({status:'success',user})

  }catch(error)
  {
    res.status(400).send( {status:'failure',message:error.message} )
  }

  });

  module.exports = router;