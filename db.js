const express = require("express");
const mongoose=require("mongoose");
const app = express();
const uri="mongodb+srv://root:root@cluster0.su2igxx.mongodb.net/?retryWrites=true&w=majority"
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("connection successful to hashcodes database");
    }
    catch(e){
        console.log("connection failed");
    }
}
connect();

const newSchema = new mongoose.Schema({
    ipfsHash:{
        type: String,
        required: true
    },
    filename:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    }
});

const hashcodes = mongoose.model("hashcodes",newSchema);
module.exports = hashcodes