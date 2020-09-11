var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000

app.get('/', function(req, res){
	res.send("Hi Reika <3");
});

app.get('/json', function(req, res){
	res.json(
		{
			message: "Hi from JS object!"
		}
	);
});

app.listen(port, function(){
   console.log("APP IS RUNNING ON PORT " + port);
});