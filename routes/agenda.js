const express = require("express")
const router= express.Router()
//------------Módulos Nativos-----------//
const path = require("path")
const app=express()

router.get("/agenda.html",function(request,response){
    return response.sendFile(path.join(__dirname,'..',"views","agenda.html"))
})





module.exports=router



