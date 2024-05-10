const express = require('express');
const bodyparser = require('body-parser')
const app=express();

const userRoute =require('./routes/User');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use("/users", userRoute)

app.listen(9000,()=>{
    console.log("Listerning to the port 9000")
})