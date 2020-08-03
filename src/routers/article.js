const express = require("express");

const upload = require('../../multer')
const auth = require("../middleware/auth");
const isAdmin = require('../middleware/isAdmin')
const { errorCodes } = require("../constants");
const articleController = require('../controller/articleController')


const router = express.Router();


router.post('/createTopic',auth,isAdmin,upload.single('image'),async (req,res) =>{
    
    if(!req.file)
    {
        return res.status(400).send({status:'failure',message:'Please provide a file'})
    }

    try{
       await articleController.createTopic(req.body.name,req.file.filename)
       res.send({status:'success',message:'Succesfully created topic'})
    }catch(error){
        res.status(400).send({status:'failure',message:error.message})
    }
})

 router.get('/getAllTopics' , auth ,isAdmin , async (req,res) => {

    try{
        const topics = await articleController.getAllTopics()
        res.send({status:'success', topics})
    }catch(error){
        res.status(400).send({status:'failure',message:error.message})
    }
 })

  module.exports = router;