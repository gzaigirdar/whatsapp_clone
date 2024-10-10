import mongoose from 'mongoose'
import validator from 'validator';
import bcrypt from 'bcrypt';
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,"please provide your name"],


    },
    email:{
        type: String,
        required:[true,"please provide your email"],
        unique:[true,"this email address exits"],
        lowercase:true,
        validate:[validator.isEmail,"please provide an email"],

    },
    picture:{
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",

    },
    status:{
        type: String,
        default: "hello there",


    },
    password:{
        type:String,
        required:[true,"please provide your password"],
        minLength: [6,"password must be 6 characters long"],
        maxLength:[50,"password has to be lower than 50"],

    }
},{
    collection: "users",
    timestamps:true,
})
userSchema.pre('save',async function (next){
    try{
        if(this.isNew){
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(this.password,salt)
            this.password = hashPass;

        }
    } catch(error){
        next(error)
    }
})
const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema);
export default UserModel; 