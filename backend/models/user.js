const mongoose=require("mongoose");

const user=mongoose.model("users",{
    fullname:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
});

module.exports=user;