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
        fecha_actual=formatDate.formatDate(fecha_actual)
        const data_user_account ={
            user_login:this.username,
            first_logindate:fecha_actual,
            hash_password:await this.encrypt(this.password),
            salt_password:"abc",
            last_logindate:fecha_actual,
            password_creation:fecha_actual,
            hash_algorithm:"bycrypt",
            account_status:"activo"
        }
        const data_user_info={
            nombre:this.name,
            apellido:this.apellido,
            email:this.email,
            telefono:this.telefono,
            pais:this.pais,
            user_account_iduser_account:0
        }
        try {
            const result= await database.query(
                "INSERT INTO user_account(??) VALUES(?)",
                [Object.keys(data_user_account), Object.values(data_user_account)]
            )
            
            data_user_account.id = result.insertId
            data_user_info.user_account_iduser_account=data_user_account.id
            
            const result2= await database.query(
                "INSERT INTO user_info(??) VALUES(?)",
                [Object.keys(data_user_info), Object.values(data_user_info)]
            )
            
            delete data_user_account.hash_password
            delete data_user_account.salt_password
            delete data_user_account.hash_algorithm
            let data=Object.assign( data_user_account,data_user_info)
        return {
            user:data,
            success:false,
            message:"Usuario registrado correctamente"
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

    async compare(string,hash){
        return await bcrypt.compare(string,hash)
    }


    async encrypt(string){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(string,salt)

        return hash
    }
}


module.exports= User