var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes/index');

app.use('/', routes);
app.set('port', process.env.PORT || 8080);

//Static files using express for solving the mime conflict
if(process.argv[2]== "dev"){
    app.use(express.Static(path.join(__dirname)));
}

//view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

var server = app.listen(app.get('port'), function() {
    console.log("Generator started!!!");
});