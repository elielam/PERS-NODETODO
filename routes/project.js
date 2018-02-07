var express = require('express');
var router = express.Router();
const db = require(`${__dirname}/../lib/models/index.js`);
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res, next) {
    if(req.session.user.isAnon === false ) {
        db.Project.findAll({
            where: {
                UserId: req.session.user.id
            }
        }).then((projects) => {
            req.session.projects = projects;
            res.redirect('/');
        })
    } else {
        res.redirect('/');
    }
});

module.exports = router;