const mongoose=require("mongoose");
const User=mongoose.model("product",{
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    image:{
        type:String,
    },
    quantity:{
        type:Number,
    }
});

module.exports=User;