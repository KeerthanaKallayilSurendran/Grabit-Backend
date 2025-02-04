const mongoose = require('mongoose')

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB Connected Succesfully");
}).catch(err=>{
    console.log("MongoDB Connection Failed");
    console.log(err);
})