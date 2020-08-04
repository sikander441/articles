module.exports = options= {
  openapi: "3.0.0",
  info:{
    title:"Article APis",
    description:"Documentation of api's made for assignment",
    contact:{
      name:'Sikander Singh',
      url:'https://www.linkedin.com/in/sikander-singh-403800112/',
      email:'sikander441@gmail.com'
    },
    version:'1.0.0'
  },
  servers:[
    {
      url:"http://localhost:{port}",
      description:"base URL of the express server",
      variables:{
        port:{
          default:8080
        }
      }
    }
  ],
  components:{
    schemas:{
      loginSchema:{
        type:"object",
        properties:{
          email:{
            type:"string"
          },
          password:{
            type:"string"
          }
        }
      },
      signupSchema:{
        type:"object",
        properties:{
          email:{type:"string"},
          password:{type:"string"},
          firstName:{type:"string"},
          lastName:{type:"string"},
          isAdmin:{type:"boolean"}
        }
      },
      ErrorModel:{
        type:"object",
        properties:{
          status:{
            type:"string"
          },
          message:{
            type:"string"
          }
        }
      },
      successLogin:{
        type:"object",
        properties:{
          status:{
            type:"string"
          },
          token:{
            type:"string"
          }
        }
      },
      successfulSignup:{
        type:"object",
        properties:{
          status:{
            type:"string"
          },
          message:{type:"string"},
          token:{
            type:"string"
          }
        }
      },
      topicSchema:{
        type:"object",
        required:["name","image"],
        properties:{
          name:{type:"string"},
          image:{
            type:"string",
            format: "binary"
          }
        }
      },
      genericResponse:{
        type:"object",
        properties:{
          status:{
            type:"string"
          },
          message:{
            type:"string"
          }
        }
      },
      topicResponseSchema:{
        type:"object",
        properties:{
          status:{type:"string"},
          topics:{
            type:"array",
            items:{
              type:"object",
              properties:{
                _id:{type:"string"},
                name:{type:"string"}
              }
            }
          },
        }
      },
      articleSchema:{
        type:"object",
        required:["topicId","title","content","isFeatured"],
        properties:{
          topicId:{type:"string"},
          title:{type:"stirng"},
          content:{type:"string"},
          isFeatured:{type:"boolean"},
          image:{type:"string",format:"binary"}
        }
      },
      updateArticleSchema:{
        type:"object",
        required:["articleId"],
        properties:{
          articleId:{type:"string"},
          content:{type:"string"},
          topicId:{type:"string"}
        }
      },
      articelByTopicSchema:{
        type:"object",
        properties:{
          status:{type:"string"},
          count:{type:"integer"},
          articles:{type:"array",items:{type:"object",properties:{_id:{type:"string"}}}}
        }
      },
      tagsSchema:{
        type:"object",
        properties:{
          tags:{
            type:"array",
            items:{type:"string"}
          },
          id:{
            type:"string",
            description:"Article id"
          }
        }
      }
    }
  },
  paths:{
    "/user/login":{
      post:{
        description:"Logs in a user using email and password and returns a JWT token",
        summary:"Log in user",
        requestBody:{
          description:"Email id and password of user",
          required:true,
          content:{
            "application/json":{
              "schema":{
                "$ref":"#/components/schemas/loginSchema"
              },
              examples:{
                sampleUser:{
                  summary:'sample login',
                  value:{
                    email:"sikander441@gmail.com",
                    password:"balbir1012"
                  }
                }
              }
            }
          }
        },
        responses:{
          200:{
            description:"A valid JWT token with 5 minute expire time",
            content:{
              "application/json":{
                schema:{
                  "$ref":"#components/schemas/successLogin"
                }
              }
            }
          },
          400: {
            description: "Unexpected error",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          }
        }
      }
    },
    "/user/signup":{
      post:{
        description: "Create a user with all details",
        summary:"Create user",
        requestBody:{
          description:"Email, password, firstname and lastname of user",
          required:true,
          content:{
            "application/json":{
              "schema":{
                "$ref":"#/components/schemas/signupSchema"
              },
              examples:{
                sampleUser:{
                  summary:"sample sign up",
                  value:{
                    "email":"sikander441@gmail.com",
                    "password":"balbir1012",
                    "firstName":"Sikander",
                    "lastName":"Singh",
                    "isAdmin":"true"
                  }
                }
              }
            }
          }
        },
        responses:{
          200:{
            description:"succesfull sign up",
            content:{
              "applciation/json":{
                schema:{
                  "$ref" : "#components/schemas/successfulSignup"
                }
              }
            }
          },
          400: {
            description: "Unexpected error",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/createTopic":{
      post:{
        description:"Create a Topic as an admin user, needed topic name and an image",
        parameters:[
          {
            name:'x-access-token',
            in:"header",
            required:"true",
            description:"JWT token received while sign-up or sign in"
          }
        ],
        requestBody:{
          description:" Topic name and an image",
          required:true,
          content:{
            "multipart/form-data":{
              "schema":{
                "$$ref":"#components/schemas/topicSchema"
              }
            }
          }
        },
        responses:{
          200:{
            description:"succesfull sign up",
            content:{
              "applciation/json":{
                schema:{
                  "$ref" : "#components/schemas/genericResponse"
                }
              }
            }
          },
          400: {
            description: "Unexpected error",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/getAllTopics":{
      get:{
        description:"Get back all topics or fetch by id  ( currently not returning images).",
        parameters:[{
          name:"id",
          in:"query",
          description:"Id of the topic to fetch"
        }],
        responses:{
          200:{
            description:"succesfull fetch topics",
            content:{
              "applciation/json":{
                schema:{
                  "$ref" : "#components/schemas/topicResponseSchema"
                }
              }
            }
          },
          400: {
            description: "Unexpected error",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/createArticle":{
      post:{
        parameters:[
          {
            name:'x-access-token',
            in:"header",
            required:"true",
            description:"JWT token received while sign-up or sign in"
          }
        ],
        requestBody:{
          description:" Article description",
          required:true,
          content:{
            "multipart/form-data":{
              "schema":{
                "$$ref":"#components/schemas/articleSchema"
              }
            }
          }
        },
        responses:{
          200:{
            description:"succesfully article created",
            content:{
              "applciation/json":{
                schema:{
                  "$ref" : "#components/schemas/genericResponse"
                }
              }
            }
          },
          400: {
            description: "Unexpected error",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/updateArticle":{
     patch:{
      parameters:[
        {
          name:'x-access-token',
          in:"header",
          required:"true",
          description:"JWT token received while sign-up or sign in"
        }
      ],
      requestBody:{
        description:" Article description",
        required:true,
        content:{
          "multipart/form-data":{
            "schema":{
              "$$ref":"#components/schemas/updateArticleSchema"
            }
          }
        }
      },
      responses:{
        200:{
          description:"succesfully article created",
          content:{
            "applciation/json":{
              schema:{
                "$ref" : "#components/schemas/genericResponse"
              }
            }
          }
        },
        400: {
          description: "Unexpected error",
          content: {
            "application/json": {
              schema: {
                "$ref": "#/components/schemas/ErrorModel"
              }
            }
          }
        },
        401: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                "$ref": "#/components/schemas/ErrorModel"
              }
            }
          }
        }
      }
      
     }
    },
    "/api/v1/getArticlesByTopic":{
      get:{
        description:"Get back all articles Under a given topic",
        parameters:[{
          name:"topicId",
          in:"query",
          description:"Id of the topic for which articles are to be fetched"
        }],
        responses:{
          200:{
            description:"succesfull fetch topics",
            content:{
              "applciation/json":{
                schema:{
                  "$ref" : "#components/schemas/articelByTopicSchema"
                }
              }
            }
          },
          400: {
            description: "Unexpected error",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/getArticleById":{
      get:{
        description:"Get an Article by article ID , depending on login/no login featured/non-featured article is fetched, It also fetches related articles based on the tags",
        parameters:[{
          name:"id",
          in:"query",
          description:"Article ID",
          required:true
        },
        {
          name:'x-access-token',
          in:"header",
          description:"Provide token if the article is featured."
        }],
        responses:{
          200:{
            description:"succesfull fetch topics",
            content:{
              "applciation/json":{
                schema:{
                  "$ref" : "#components/schemas/articelByTopicSchema"
                }
              }
            }
          },
          400: {
            description: "Unexpected error",
            content: {
              "application/json": {
                schema: {
                  "$ref": "#/components/schemas/ErrorModel"
                }
              }
            }
          }
        }
      }
    },
    "/api/v1/associateTagstoArticle":{
     post:{
      description:"Associate tags with an aritlce",
      requestBody:{
        description:" List of tags to attach and article id",
        required:true,
        content:{
          "application/json":{
            "schema":{
              "$$ref":"#components/schemas/tagsSchema"
            }
          }
        }
      },
      responses:{
        200:{
          description:"succesfully article created",
          content:{
            "applciation/json":{
              schema:{
                "$ref" : "#components/schemas/genericResponse"
              }
            }
          }
        },
        400: {
          description: "Unexpected error",
          content: {
            "application/json": {
              schema: {
                "$ref": "#/components/schemas/ErrorModel"
              }
            }
          }
        },
      }
     }
    }
  }
}