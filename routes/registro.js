//-----Módulos Externos
const express = require("express")
const router= express.Router()

//-----------------------------------------
const database=require("../libs/database")
const view=require("../helpers/views")
const User=require("../models/user")

//------------Módulos Nativos-----------//
const path = require("path")
const res = require("express/lib/response")

//-----constantes--------//
const app=express()

//------Get para el main de registro----------------//
router.get("/registro.html",function(request,response){
    return view("registro.html",response)
})

//-------------Post para insertar------------------------------//
router.post("/registro.html", async function(request,response){
    console.log(request.body)
    const user= new User(request.body)
    const validation= user.validate()
    if(validation.validated){
        return response.json(await user.save())
    }

    return response.json(validation)
})

//------------------Put para Actualizar------------------------------//
router.put("/registro/actualizar", async function(request,response){
    console.log((request.body))
    const user= new User(request.body)
    const validation= user.validate()
    console.log(user.data)
    if(validation.validated){
        return response.json(await user.save())
    }

    return response.json(validation)
})

//------------------Get para Consultar------------------------------//
router.get("/registro/consulta", async function(request,response){
    try{
        const data = await database.query("SELECT * FROM user_account")

        return response.json(data)
    }catch(error){
        return response.json({
            error:true,
            message:"An error ocurred"
        })
    }
})



module.exports=router



