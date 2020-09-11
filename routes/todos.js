var express = require('express');
var router = express.Router();
var db = require("../models");


router.get('/', function(req, res){
	// res.send("Hello from Todos Routes");
	db.Todo.find()
	.then(function(todos){
		res.json(todos);
	})
	.catch(function(err){
		res.send(err);
	});
});

module.exports = router;
