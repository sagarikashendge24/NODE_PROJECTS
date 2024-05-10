const express = require("express")
const bodyParser = require("body-parser")
const route = require("../Ddfourth_project/route/index")
const app = express()
app.use(bodyParser.json())
app.use(route)
app.listen(3000, () => {
    console.log("listning.....")
})