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
     return await topicModel.find({_id}).select("_id name")
    else
     return await topicModel.find().select("_id name")
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

const tagArticleById = async ( articleId , tags ) => {
    if( !articleId || !tags )
     throw errorCodes.ARGUMENTSMISSING

     const article = await articleModel.findOne({_id:articleId});

     if(!article)
      throw errorCodes.ARTICLENOTFOUND

     tags.forEach( tag => {
         article.tags.indexOf(tag) == -1 ? article.tags.push(tag):null;
     })

     await article.save();
     return article;
    
}

const getRelatedArticles  = async (articleId) => {

    if(!articleId)
     throw errorCodes.ARGUMENTSMISSING

     const sourceArticle = await articleModel.findOne({_id:articleId});
     if(!sourceArticle)
      throw errorCodes.ARTICLENOTFOUND

    var relatedArticles = []
    const articles = await articleModel.find().select("_id tags");
    
    dict = {}
    sourceArticle.tags.forEach( tag => dict[tag]=true )
    console.log(dict)
    
    for(var i=0; i<articles.length; i++ )
    {

       
        if(articles[i]._id.equals(sourceArticle._id) )
         continue;
        
        var countMatches = 0;
        
        articles[i].tags.forEach ( tag => {
           
            if(dict[tag] == true)
             countMatches++;
        })
        if(countMatches > 0)
         relatedArticles.push({_id:articles[i]._id , matchingTagsCount: countMatches })
    }
    return relatedArticles.sort( (a,b) => b.matchingTagsCount - a.matchingTagsCount);

}
module.exports = {
    createTopic,
    getAllTopics,
    createArticle,
    updateArticle,
    getArticlesByTopic,
    getArticleById,
    tagArticleById,
    getRelatedArticles
}