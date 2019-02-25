const oAuthClient = require('../index')
const express = require('express');
require('dotenv').config();

let app = express()
const client = new oAuthClient('436805615797403649', process.env.clientSecret)

app.get('/login', async (req, res)=>{
    let code = req.query.code;
    try{
        await client.getAccess(code, 
            ['identify','guilds','connections'], 
            'http://localhost:3000/login') // Gets the access token

        console.log(await client.getAuthorizedUserConnections())    // Gets /users/@me/connections
        res.send(await client.getAuthorizedUser()) // Gets /users/@me
        console.log(await client.getAuthorizedUserGuilds())  // Gets /users/@me/guilds


    }
    catch(error){
        console.log(error)
    }
})

app.listen(3000, ()=>{console.log('Server is ready!')})
