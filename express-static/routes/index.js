const express = require('express');
const router = express.Router();
const OAuthClient = require('disco-oauth');

const client = new OAuthClient('638834154238377994', process.env.clientSecret)
  .setScopes('identify', 'guilds')
  .setRedirect('http://localhost:3000/login');

router.get('/auth/discord', (req, res) => {
  if (req.cookies['userKey']) res.redirect('/options');
  else res.redirect(client.authCodeLink);
});

router.get('/login', async (req, res) => {
  try {
    let userKey = await client.getAccess(req.query.code);
    res.cookie('userKey', userKey);
    res.redirect('/options');
  }
  catch (err) {
    res.send(`<link rel="stylesheet" href="/stylesheets/style.css" /><h1>${err.message}</h1><p>${err.stack}</p>`)
  }
});

router.get('/is-authorized', async(req, res) => {
  if (req.cookies['userKey']) res.sendStatus(200);
  else res.sendStatus(404);
});

router.get('/get-user', async (req, res) => {
  try {
    let user = await client.getUser(req.cookies['userKey']);
    res.status(200).json({
      username: user.username,
      discriminator: user.discriminator,
      id: user.id,
      bot: user.bot,
      nitro: user.premiumType,
      flags: user.userFlags,
      registered: user.createdAt.toUTCString(),
      avatar: user.avatarUrl(256)
    });
  }
  catch (err) {
    res.status(err.code).send(err);
  }
});

router.get('/get-guilds', async(req, res)=> {
  try {
    let guilds = (await client.getGuilds(req.cookies['userKey'])).toJSON();
    let guildsToReturn = {};
    for (let g of Object.keys(guilds)) {
      guildsToReturn[g] = {
        name: guilds[g].name,
        icon: guilds[g].iconUrl(128)
      }
    }
    res.status(200).send(guildsToReturn);
  }
  catch(err) {
    res.status(err.code).send(err);
  }
});

module.exports = router;
