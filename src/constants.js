const errorCodes = {
    USERNOTFOUND:{
        message:'No such user found'
    },
    DEFATUL:{
        message:'Something went wrong'
    },
    PASSWORDINCORRECT:{
        message:'The password entered is incorrect.'
    },
    ARGUMENTSMISSING:{
        message:'Plese Provide specified arguments to the request'
    },
    USEREXISTS:{
        message:'User already registered.'
    },
    TOPICDOESNOTEXISTS:{
        message:'Topic with given id does not exists'
    },
    ARTICLENOTFOUND:{
        message:'Article with given id does not exists'
    },
    ILLEGALARTICLEACCESS:{
        message:'Please log in to access the article'
    }

}

module.exports = {
    errorCodes
}