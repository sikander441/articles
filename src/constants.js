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
    }

}

module.exports = {
    errorCodes
}