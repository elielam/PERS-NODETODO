var express = require('express');
var router = express.Router();
const db = require(`${__dirname}/../lib/models/index.js`)

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.cat);
  res.render('./contents/index', { session: req.session});
})
.get('/home', function(req, res, next) {
  res.render('./contents/index', { session: req.session});
});

// LOGOUT
router.get('/logout', function(req, res, next) {
    req.session.user = undefined;
    req.session.todos = undefined;
    req.session = undefined;
    res.redirect('/');
});

module.exports = router;
