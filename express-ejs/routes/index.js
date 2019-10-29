const express = require('express');
const router = express.Router();
const OAuth = require('disco-oauth');
const client = new OAuth('638834154238377994', process.env.clientSecret);
client
  .setScopes('identify', 'guilds')
  .setRedirect('http://localhost:3000/login');


router.get('/', function(req, res) {
  res.render('index', { title: 'Express EJS' });
});

router.get('/auth/discord', (req, res) => {
  if (req.cookies.userKey) res.redirect('/options');
  else res.redirect(client.authCodeLink);
});

router.get('/login', async (req, res)=>{
  try {
    let userKey = await client.getAccess(req.query.code);
    res.cookie('userKey', userKey);
    res.redirect('/options');
  }
  catch(err) {
    res.render('error', {
      message: err.message, error: err
    });
  }
});

router.get('/options', (req, res) => {
  if (!req.cookies.userKey) res.redirect('/');
  else res.render('options', {title: 'Express EJS'});
});

router.get('/user', async (req, res) => {
  if (!req.cookies.userKey) res.redirect('/');
  else {
    try {
      let user = await client.getUser(req.cookies.userKey);
      res.render('user', {title: 'Express EJS', user});
    }
    catch (err) {
      res.render('error', {
        message: err.message, error: err
      });
    }
  }
});

router.get('/guilds', async (req, res) => {
  if (!req.cookies.userKey) res.redirect('/');
  else {
    try {
      let guilds = await client.getGuilds(req.cookies.userKey);
      console.log(guilds.size);
      res.render('guilds', {title: 'Express EJS', guilds});
    }
    catch (err) {
      res.render('error', {
        message: err.message, error: err
      });
    }
  }
});

module.exports = router;
