// import .env file
require('dotenv').config()

// import express
const express=require('express')

const router=require('./router/router')

const cors=require('cors')


// create server
const server=express()

server.use(cors())

// convert data json data
server.use(express.json())


// import connection
require('./connection/connection')

// port
const port=5001 ||  process.env.port

server.use(router)

server.listen(port,()=>{
    console.log(`________server stated at port number ${port}____________`);
})






