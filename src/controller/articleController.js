const topicModel = require('../models/Topic')
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

const getAllTopics = async () => {
    return await topicModel.find()
}
module.exports = {
    createTopic,
    getAllTopics
}