var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todoapi');

// allow use of promises
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
