const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();
const api = require('./server/routes/routes');
const dbConnection = require('./server/db');

dbConnection();
app.use(express.static(__dirname + '/statics'));
app.use(bodyParser.json());
app.use(function (_, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods","*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, apptoken");
	next();
});
app.use(api);

app.listen(port, console.log('Example app listening on port ' + port));