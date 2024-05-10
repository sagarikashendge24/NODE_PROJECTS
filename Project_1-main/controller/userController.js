const { json } = require('body-parser')
var jsondata = require('../data')


exports.get = function(req,res) {
    res.json(jsondata)
}

exports.post = function(req,res){
    if(req.body.id && req.body.name){
        const data=req.body       
        jsondata.push(req.body)
        res.send("Posted Succesfully")

    }else{
        res.send("OPPS!!!! Something went wrong!!!!")
    }  
}


exports.getbyid=function(req,res){
    const id=req.params.id
    const foundUser=jsondata.find((user)=>user.id == id)
    if (foundUser){
        res.send(foundUser) }
    else{
        console.log("User did not found!!!")
        res.send("User did not found!!!")
            }
}

// exports.put=((req,res)=>{
//     let id=req.params.id
//     let bodyyy=req.body
//     let index=jsondata.findIndex((jsondata)=>{
//         return(jsondata.id==Number.parseInt(id))
//     })
//     if (index >=0){
//         let data_=jsondata[index]
//         data_=bodyyy
//         // data_.body=body_
//         jsondata.push(data_)
//         res.json(data_)
//     }else{
//         res.status(404).send("SOMETHING WENT WRONG")
//     }
// })




exports.delete = function(req,res){
    const {id}=req.params
    const foundUser=jsondata.find((user)=>user.id == id)
    if (foundUser){
        jsondata=jsondata.filter((user)=>(user.id !== id))
        res.send(`Userdata with id ${id} deleted from database`)
    }else{
        res.send("Something went wrong!!!")
    }
}

