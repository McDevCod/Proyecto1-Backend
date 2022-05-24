const  formatDate=require("../helpers/funciones")
const database = require("../libs/database")
const bcrypt = require("bcrypt")

class User{
    constructor(data){
        this.username = data.username
        this.name = data.name
        this.apellido = data.apellido
        this.email = data.email
        this.telefono = data.telefono
        this.pais = data.pais
        this.password = data.password
        this.data = data
    }

    validate(){
        if(!(this.username && this.name && this.apellido && this.email && this.telefono && this.pais && this.password)){
            return {
                message:"Debes completar todos los campos",
                validated:false
            }
        }
        if(this.username.length<3){
            return {
                message:"Username debe ser mayor a 3 caracteres",
                validated:false
            }
        }

        return{
            validated:true
        }
    }
    

    isComplete(field){
        return field
    }


    async save(){
        var fecha_actual=new Date()
        fecha_actual=formatDate(fecha_actual)
        const data1 ={
            user_login:this.username,
            first_logindate:fecha_actual,
            hash_password:await this.encrypt(this.password),
            salt_password:"abc",
            last_logindate:fecha_actual,
            password_creation:fecha_actual,
            hash_algorithm:"bycrypt",
            account_status:"activo"
        }
        /**const data2={
            nombre:this.nombre,
            apellido:this.apellido,
            email:this.email,
            telefono:this.telefono,
            pais:this.pais,
            user_account_iduser_account:0
        }**/
        try {
        const result= await database.query(
            "INSERT INTO user_account(??) VALUES(?)",
            [Object.keys(data1), Object.values(data1)]
        )
        return result
        }catch(error){
            return error
        }
    }

    async getUserId(usern){
        try {
            const result= await database.query(
                "SELECT id_user_account FROM user_account WHERE user_login = (?)",
                [usern]
            )
            return result
            }catch(error){
                return error
            }

    }

    async encrypt(string){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(string,salt)

        return hash
    }
}


module.exports= User