const topicModel = require('../models/Topic')
const articleModel = require('../models/Article')
const {errorCodes} = require('../constants')

const fs = require('fs')
const path = require('path')

const createTopic = async (name,filename) => {

    if (!name || !filename)
     throw errorCodes.ARGUMENTSMISSING
    
    var Topic = {
        name,
        img :{
            data:fs.readFileSync(path.join(__dirname+'../../../'+'/uploads/'+filename)),
            contentType:'image/png'
        }
    }
    
    var topic =  await topicModel.create(Topic)
    await topic.save();
}

const getAllTopics = async (_id) => {
   
    if(_id)
     return await topicModel.find({_id})
    else
     return await topicModel.find()
}

const createArticle = async (topicId , title, content, isFeatured ,image) => {

    if(!topicId  ||  !title || !content)
        throw errorCodes.ARGUMENTSMISSING;
    
    let topic = await topicModel.findOne({ _id:topicId });
    if(!topic)
     throw errorCodes.TOPICDOESNOTEXISTS

    if(!image){
        var Article = {
            Title:title,
            Content:content,
            isFeatured,
            Topic:topicId
        }
    }
    else{
        var Article = {
            Title:title,
            Content:content,
            isFeatured,
            Topic:topicId,
            img :{
                data:fs.readFileSync(path.join(__dirname+'../../../'+'/uploads/'+image)),
                contentType:'image/png'
            }
        }
    }

    var article =  await articleModel.create(Article)
    await article.save();
}



const updateArticle = async (articleId , data , filename) => {
    
    if(!data || !articleId)
     throw errorCodes.ARGUMENTSMISSING

    let article = await articleModel.findOne({ _id:articleId });
    if(!article)
     throw errorCodes.ARTICLENOTFOUND
    if(data.topicId)
     article.Topic = data.topicId;
    if(data.title)
     article.Title = data.title;
    if(data.content)
     article.Content = data.content;
    if(data.isFeatured != article.isFeatured)
     article.isFeatured = data.isFeatured;
    if(filename)
    {
        article.img = {
            data:fs.readFileSync(path.join(__dirname+'../../../'+'/uploads/'+filename)),
            contentType:'image/png'
        }
    }
  
    await article.save();
}

const getArticlesByTopic = async (topicId) => {

    if(!topicId)
     throw errorCodes.ARGUMENTSMISSING

    const articles = await articleModel.find({Topic:topicId}).select("_id")
    return articles
}

const getArticleById = async (articleId,isLoggedIn=false) => {

    if(!articleId)
     throw errorCodes.ARGUMENTSMISSING

    const article = await articleModel.findOne({_id:articleId});

    if(!article)
     throw errorCodes.ARTICLENOTFOUND
    if(article.isFeatured && !isLoggedIn)
     throw errorCodes.ILLEGALARTICLEACCESS

    article.views = article.views+1
    await article.save();
    return article
}

module.exports = {
    createTopic,
    getAllTopics,
    createArticle,
    updateArticle,
    getArticlesByTopic,
    getArticleById
}