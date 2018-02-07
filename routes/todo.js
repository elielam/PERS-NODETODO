var express = require('express');
var router = express.Router();
const db = require(`${__dirname}/../lib/models/index.js`);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
    if(req.session.user.isAnon === false ) {
        db.Todo.findAll({
            where: {
                UserId: req.session.user.id
            }
        }).then((todos) => {
            req.session.todos = todos;
            res.redirect('/');
        })
    } else {
        res.redirect('/');
    }
});

router.post('/add', urlencodedParser, function(req, res, next) {
    if(req.session.user.isAnon === false ) {
        db.Todo.create({title: req.body.todoTitle, complete: false, UserId: req.session.user.id}).then(todo => {
            console.log('todo add !');
            res.redirect('/todo');
        })
    } else {
        res.redirect('/');
    }
});

router.get('/del/:id', function(req, res, next) {
    if(req.session.user.isAnon === false && req.params.id !== '') {
        db.Todo.destroy({where:{ id: req.params.id }}).then( (todo) => {
            console.log('Todo del !');
            res.redirect('/todo');
        })
    } else {
        res.redirect('/');
    }
});

module.exports = router;