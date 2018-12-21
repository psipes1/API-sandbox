var express      = require("express"); //brings in express from installed package
var app          = express(); //assigns express functionality to this variable
var bodyParser   =  require("body-parser"); //brings in body-parser from installed package

var todoRoutes   = require("./routes/todos"); /*brings in the file data from routes folder
                                                and todos.js file */
                                        

app.use(bodyParser.json()); //tells the system that you want json to be used
app.use(bodyParser.urlencoded({extended: true})); 
                /* (Defines how bodyParser will parse url)
                        basically tells the system 
                        whether you want to use a simple 
                        algorithm for shallow parsing (i.e. false) 
                        or complex algorithm for deep parsing that 
                        can deal with nested objects (i.e. true). */
                
app.use(express.static(__dirname + '/public')); //tells express to use public directory files
app.use(express.static(__dirname + '/views')); //tells express to pull from static file

app.use("/api/todos", todoRoutes); //assigns todoRoutes info and tags it onto this route


app.get("/", function(req, res){ //root route
    res.sendFile("index.html"); 
});






app.listen(process.env.PORT, process.env.IP, function(){ //Server
    
   console.log("App is running...") 
});