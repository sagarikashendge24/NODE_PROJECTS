const express= require('express')
const app= express()

const bodyParser=require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const userRoutes=require('./routes/routes')
app.use('/users',userRoutes)

app.listen(2000,(req,res)=>{
    console.log("LISTERNING to the port 2000")
})




































































