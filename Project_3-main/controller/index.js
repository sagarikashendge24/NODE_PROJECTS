// const knex = require('knex')
const jwt = require("jsonwebtoken")
const con =require('../module/index')

const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "Nav@gur1",
      database: "Project3",
    },
  });


// for signing up the user
exports.signup = (req, res) => {
    knex("signup").insert({
        
        Email: req.body.email,
        Password: req.body.password
    }).then(() => {
        const tokon = jwt.sign({ Email: req.body.email,Password:req.body.password }, "sagarika");
        res.cookie('jwt', tokon, { httpOnly: true, secure: true, maxAge: 3600000 });
        res.status(200).json({
            message:"signup successfull"
            ,token:tokon
        })
    }).catch((err) => {
        res.send(err)
    })
}

// for loging in the user
exports.login = (req, res) => {
    knex("signup").select("Email").where({ Email: req.body.email } && { Password: req.body.password }).then((result) => {
        if (result.length != 0) {
            const tokon = jwt.sign({ Email_id: req.body.email,Password:req.body.password }, "sagarika");
            res.cookie('jwt', tokon, { httpOnly: true, secure: true, maxAge: 3600000 });
            res.status(200).json({
                message:"Login successfull"
                ,token:tokon
            })       }
        else {
            res.send("you have to signup first")
        }
    }).catch((err) => {
        res.send(err)
    })
}

// for posting the post
exports.post=(req,res)=>{
    var a=knex("signup").select("ID").where('Email' , req.body.email)
    knex("post").
    insert({
      ID : a,
      Email:req.body.email,
      Post : req.body.post
    })
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
}
    

// for getting states
exports.all_post=(req,res)=>{
    knex("post").
    select("*")
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
}


exports.id=(req,res)=>{
    const id=req.params.id
    var post= knex("post").
    select("Post")
    .where("ID",id)
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        res.send(err)
    })
}


exports.likedislike=(req,res)=>{
    var like=req.body.like
    var dislike=req.body.dislike
    var id=knex("signup").select("ID").where('Email' , req.body.email)

    knex("likedislike").
    insert({
      ID : id,
      Like:like,
      Dislike :dislike
    })
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
}


exports.like=(req,res)=>{
    var id=req.params.id
 var like=knex("likedislike").select("Like").where("ID",id).then((result) => {
        count=0
        for (i of result.values()){
            if (i.Like!=0){
                count++
            }
            
        }res.send({Like:count})
        
        
    }).catch((err) => {
        res.send(err)
    })}



exports.dislike=(req,res)=>{
    var id=req.params.id
    knex("likedislike").select("Dislike").where("ID",id).then((result) => {
        count_=0
        for (i of result.values()){
            if (i.Dislike!=0){
                count_++
            // console.log(i.Like)
            }
            
        }
        res.send({Dislike:count_})
        
        
    }).catch((err) => {
        res.send(err)
    })  
}



exports.likedislike = (req, res) => {
    var id=req.params.id
    knex("likedislike")
    .select("*").where("ID",id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.send(err)
    })
}