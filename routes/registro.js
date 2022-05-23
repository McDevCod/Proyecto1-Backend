//-----Módulos Externos
const express = require("express")
const router= express.Router()
const database=require("../libs/database")



//------------Módulos Nativos-----------//
const path = require("path")

//-----constantes--------//
const app=express()

router.get("/registro.html",function(request,response){
    database.connection.query("SELECT * FROM user_account",function(error,result,fields){
        console.log(error)
        console.log(result)
    })
    response.sendFile(path.join(__dirname,'..',"views","registro.html"))
})


module.exports=router



