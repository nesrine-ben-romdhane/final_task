const mongoose = require ('mongoose')
const validator = require ('validator')
const bcryptjs = require('bcrypt');
const userSchema = new mongoose.Schema({
    username : {
        type: String , 
        trim : true ,
        required : true,
        unique: true,
    },
    password : {
        type : String ,
        required : true ,
        trim : true ,
        minlength : 8 ,
        validate(value){
            let password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
            if(!password.test(value)){
                throw new Error("Password must include uppercase , lowercase , numbers , speacial characters")
            }
        }
    },
    active : {
        type : Boolean ,
        default:true,
    },
    Roles : {
        type : [String ],
        default: ['Employee']
    },
    tokens : [
        {
            type: String,
            required : true
        }
    ]
})
userSchema.pre ("save" , async function ()  {
    const user = this   //  => Document 

    if (user.isModified('password')) {
     user.password = await bcryptjs.hash(user.password,8)
    }
})


module.exports = mongoose.model( 'User' , userSchema  )


