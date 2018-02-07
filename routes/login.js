var express = require('express');
var router = express.Router();
const db = require(`${__dirname}/../lib/models/index.js`);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const anonUser = {firstName: 'anon', lastName: 'anon', mail:'anon@anon.fr', password: null, isAnon: true, isLogged: false, age: 18};

router.get('/', function(req, res, next) {
    res.render('./contents/login', {
        session: req.session
    });
});

router.post('/login_check', urlencodedParser , function(req, res, next) {
    db.User.findOne({
        where: {
            email: req.body.loginMail,
            password: req.body.loginPass
        }
    }).then((user) => {
        if (user) {
            req.session.user = user;
            res.redirect('/todo')
        } else {
            req.session.user = anonUser;
            res.redirect('/login');
        }
    })

});

module.exports = router;