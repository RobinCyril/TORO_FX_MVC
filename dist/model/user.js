import mongoose from 'mongoose';
// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });

// const url= process.env.DATABASE;
// mongoose.connect(url,{
//     useUnifiedTopology:true,useNewUrlParser:true
// })
// .then(()=>console.log("successfully connected to Database!"))
// .catch((err)=>console.log(err));

const userSchema=mongoose.Schema({
    // fname:{
    //     type:String,
    //     // required:true
    // },
    username:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    mob:{
        type:Number,
        // required:true
    },
    status:{
        type:String,
        // required:true
    },
    location:{
        type:String,
        // required:true
    },
    pro:{
        type:String,
        // required:true
    },
    status:{
        type:String,
        // required:true
    },
    acheivement:String,
    program:String,
    photo:String,
})

export const user= new mongoose.model('TOROFX_user', userSchema);
