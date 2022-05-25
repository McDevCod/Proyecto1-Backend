const  formatDate=require("../helpers/funciones")
const database = require("../libs/database")
/**
fecha_inicio:signup.fecha_inicial.value,  
nombre:signup.nombre_evento.value,
fecha_final:signup.fecha_final.value,
descripcion:signup.descripcion.value**/
class Eventos{
    constructor(data){
        this.fecha_inicio = data.fecha_inicio
        this.fecha_final = data.fecha_final
        this.nombre_evento = data.nombre
        this.descripcion = data.descripcion
        this.event_organizer=data.id_usuario
        this.data = data
    }

    validate(){
        if(!(this.fecha_inicio && this.fecha_final && this.nombre_evento && this.descripcion )){
            return {
                message:"Debes completar todos los campos",
                validated:false
            }
        }
        if(this.fecha_final < this.fecha_inicio){
            return {
                message:"La fecha Final no puede ser mayor a la fecha inicial",
                validated:false
            }
        }

        return{
            validated:true
        }
    }
        
    async save(){
        const fecha_ini=new Date(this.fecha_inicio)
        const fecha_fin=new Date(this.fecha_final)
        console.log(fecha_ini)
        const data_event ={
            fecha_inicial:formatDate.formatDatetime(fecha_ini),
            fecha_final:formatDate.formatDatetime(fecha_fin),
            nombre:this.nombre_evento,
            descripcion:this.descripcion
        } 
        const data_event_organization={
            evento_idevento:0,
            contacto_id_contacto:0,
            user_account_id_user_account:this.event_organizer,
            status_evento:"Activo"
        }

        console.log(data_event)
        console.log(data_event_organization)
        try {
            const result= await database.query(
                "INSERT INTO evento(??) VALUES(?)",
                [Object.keys(data_event), Object.values(data_event)]
            )
            
            data_event_organization.evento_idevento = result.insertId
            
            const result2= await database.query(
                "INSERT INTO organizacion_evento(??) VALUES(?)",
                [Object.keys(data_event_organization), Object.values(data_event_organization)]
            )
            
            console.log(data_event)
        return {
            evento:data_event,
            success:true,
            message:"Evento creado correctamente"
        }
        }catch(error){
            return error
        }
    }

    
    async login(){
        const result = await database.query(
            "SELECT * FROM user_account LEFT JOIN user_info ON user_account.id_user_account=user_info.user_account_iduser_account WHERE user_account.user_login = ?",[this.username])
        const user = result[0]
        console.log(this.password)
        console.log(user)
        if(user){
            if(await this.compare(this.password,user.hash_password)){
                delete user.hash_password
                return {
                    success:true,
                    user,
                    message:"Usuario correcto"
                }

            }else{
                return {
                    success:false,
                    message:"Credenciales incorrectas"
                }
            }

        }

        return {
            success:false,
            message:"Usuario no registrado"
        }
    }

}


module.exports= Eventos


