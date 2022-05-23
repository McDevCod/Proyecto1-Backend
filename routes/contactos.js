const express = require("express")
const router= express.Router()
//------------Módulos Nativos-----------//
const path = require("path")
const app=express()

router.get("/contactos.html",function(request,response){
    return response.sendFile(path.join(__dirname,'..',"views","contactos.html"))
})





module.exports=router



