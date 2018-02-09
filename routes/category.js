var express = require('express');
var router = express.Router();
const db = require(`${__dirname}/../lib/models/index.js`);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
    if(req.session.user.isAnon === false ) {

        db.Category.findAll({

        }).then((categories) => {
            req.session.categories = categories;
            res.redirect('/todo');
        });

    } else {
        res.redirect('/');
    }
});

router.post('/add/t', urlencodedParser, function(req, res, next) {
    if(req.session.user.isAnon === false ) {
        db.Category.create({title: 'testT', type: 'todo', UserId: req.session.user.id}).then(todo => {
            console.log('category todo add !');
            res.redirect('/');
        })
    } else {
        res.redirect('/');
    }
});

router.post('/add/p', urlencodedParser, function(req, res, next) {
    if(req.session.user.isAnon === false ) {
        db.Category.create({title: 'testP', type: 'project', UserId: req.session.user.id}).then(todo => {
            console.log('category project add !');
            res.redirect('/cat');
        })
    } else {
        res.redirect('/');
    }
});


module.exports = router;