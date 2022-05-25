//-----Módulos Externos
const express = require("express")
const router= express.Router()

//-----------------------------------------
const database=require("../libs/database")
const view=require("../helpers/views")
const User=require("../models/user")
const Evento=require("../models/eventos")

//------------Módulos Nativos-----------//
const path = require("path")
const res = require("express/lib/response")

//-----constantes--------//
const app=express()

//------Get para el main de Eventos----------------//
router.get("/eventos",function(request,response){
    return view("eventos.html",response)
})

//-------------Post para insertar------------------------------//
router.post("/eventos", async function(request,response){
    console.log(request.body)
    const evento= new Evento(request.body)
    const validation= evento.validate()
    if(validation.validated){
        return response.json(await evento.save())
    }

    return response.json(validation)
})

//------------------Put para Actualizar------------------------------//
router.put("/eventos/actualizar", async function(request,response){
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
router.get("/eventos/consulta", async function(request,response){
    try{
        const data = await database.query("SELECT * FROM user_account LEFT JOIN user_info ON user_account.id_user_account=user_info.user_account_iduser_account")

        return response.json(data)
    }catch(error){
        return response.json({
            error:true,
            message:"An error ocurred"
        })
    }
})

//------------------Delete para Eliminar------------------------------//
router.delete("/evento/eliminar", async function(request,response){
    try{
        const data = await database.query("SELECT * FROM user_account LEFT JOIN user_info ON user_account.id_user_account=user_info.user_account_iduser_account")

        return response.json(data)
    }catch(error){
        return response.json({
            error:true,
            message:"An error ocurred"
        })
    }
})



module.exports=router



