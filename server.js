var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var pusher = new Pusher({
    appId: '<ADD_YOUR_APPID>',
    key: '<ADD_YOUR_KEY>',
    secret: '<ADD_YOUR_SECRECT>',
    cluster: '<ADD_YOUR_CLUSTER>',
    encrypted: true
});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/comment', (req, res) => {
    console.log(req.body);
    var newComment = {
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment
    }
    pusher.trigger('flash-comments', 'new_comment', newComment);
    res.json({
        created: true
    });
});

//Error Handle for 404 Pages
app.use((req, res, next) => {
    var error404 = new Error('Route Not Found');
    error404.status = 404;
    next(error404);
});

module.exports = app;

app.listen(9000, () => {
    console.log('The magic is on port 9000');
});