const express          = require("express");
const app 			 = express();
const ejs              = require("ejs");
const request          = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("search");

});

app.get("/result", function(req, res){


		var search = req.query.search
		var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + search
		request(url, function(error, response, body){

				if(!error && response.statusCode == 200){
				// res.send(body);
				var parsedData = JSON.parse(body);
				res.render("results", {data: parsedData});
			} else {

				console.log("Something went wrong: " + error);

			}



		});

});




app.listen(3000, function() {

	console.log("App is running...");
});

