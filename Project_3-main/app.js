const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const route=require("../Cccthird_project/route/index")
app.use(bodyParser.json())
app.use(route)


app.listen(3000,()=>{
    console.log("listerning to the port 3000")
})