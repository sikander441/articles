const express = require("express");

const upload = require('../../multer')
const auth = require("../middleware/auth");
const isAdmin = require('../middleware/isAdmin')
const { errorCodes } = require("../constants");
const articleController = require('../controller/articleController')
const isLoggedIn = require('../middleware/isLoggedIn')


const router = express.Router();


router.post('/createTopic',auth,isLoggedIn,isAdmin,upload.single('image'),async (req,res) =>{
    
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

 router.get('/getAllTopics' ,  async (req,res) => {
    const _id = req.query.id
    try{
        const topics = await articleController.getAllTopics(_id)
        res.send({status:'success', topics})
    }catch(error){
        res.status(400).send({status:'failure',message:error.message})
    }
 })

  router.post('/createArticle' ,auth,isLoggedIn, isAdmin ,upload.single('image'), async (req,res) => {
    
    const data = req.body;
    try{
        await  articleController.createArticle(data.topicId, data.title, data.content, data.isFeatured, req.file?req.file.filename:undefined);
        res.send({status:'success',message:'Succesfully created article'})
      }catch(error){
          res.send({status:'failure',message:error.message})
      }
  })


   router.patch('/updateArticle' ,auth ,isLoggedIn, isAdmin, upload.single('image'), async (req,res) => {
      
        const data = req.body;
        const articleId = req.body.articleId
        
       try{
            await articleController.updateArticle(articleId,data,req.file?req.file.filename:undefined);
            res.send({status:'success',message:'Succesfully Updated article'})
        }catch(error){
           res.send({status:'failure',message:error.message})
       }
   })


   router.get('/getArticlesByTopic',auth, async (req,res) => {
    
    const topicId = req.query.topicId
       try{
            const articles = await articleController.getArticlesByTopic(topicId)
            res.send({status:'success',count:articles.length,articles})
       }catch(error){
            res.status(400).send({status:'failure',message:error.message})
       }
   })


   router.get('/getArticleById', auth ,async (req,res) => {
       const articleId = req.query.id;
       const isLoggedIn = req.loggedIn

       try{
        const article = await articleController.getArticleById(articleId,isLoggedIn)
        const relatedArticles = await articleController.getRelatedArticles(articleId)

        res.send({status:'success',article,relatedArticles})
   }catch(error){
        res.status(400).send({status:'failure',message:error.message})
   }
   })

   router.post('/associateTagstoArticle' , auth , async (req,res) => {
       const tags = req.body.tags;
       const articleId = req.body.id

       try{
            const article = await articleController.tagArticleById(articleId , tags)
            res.send({status:'success',article})
        }catch(error){
                res.status(400).send({status:'failure',message:error.message})
        }
   })
  module.exports = router;