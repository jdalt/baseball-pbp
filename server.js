var express = require('express');
var app = new express();
var bodyParser = require('body-parser')
var _ = require('lodash')

app.use(bodyParser.json())
app.use(express.json())
app.use(express.static(__dirname + '/public'))

var port = Number(process.env.PORT || 3000);

app.listen(port);
