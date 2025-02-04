require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./config/connection')
const router = require('./routes/router')

const grabitServer = express()
grabitServer.use(cors())
grabitServer.use(express.json())
grabitServer.use(router)

const PORT = 3000 || process.env.PORT

grabitServer.listen(PORT,()=>{
    console.log(`GrabIt Server running at Port: ${PORT} and waiting for client request`);
})


grabitServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style='color:purple'>GrabIt server is running and waiting for client request</h1>`)
})
