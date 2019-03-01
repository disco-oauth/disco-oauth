const oAuthClient = require('../index')
const express = require('express');
require('dotenv').config();

let app = express()
const client = new oAuthClient(
    '436805615797403649',               // The Client ID
     process.env.clientSecret           // The Client Secret
)   // Initiate the client.

client.setScopes(['identify','guilds'])             // Set the scopes
client.setRedirect('http://localhost:3000/login')   // Set the redirect URI

app.get('/', (req, res)=>{
    res.send(`<a href="${client.getAuthCodeLink()}">Click here to get started</a>`) // Getting the auth code link
})

app.get('/login', async (req, res)=>{
    let code = req.query.code;
    try{
        let key = await client.getAccess(code) // Gets the access token

        console.log(client.getAccessObject(key))    // Get the access token response (really not recommended)

        console.log(await client.getAuthorizedUser(key)) // Gets /users/@me (will log in console)
        res.send(await client.getAuthorizedUserGuilds(key))  // Gets /users/@me/guilds (shows in browser) (pretty ugly)

    }
    catch(error){
        console.log(error)
    }
})

app.listen(3000, ()=>{console.log('Server is ready!')})
