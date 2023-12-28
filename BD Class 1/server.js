//Server Instancetiate
const express = require('express')
const app = express();

//Use to parse (req.body) --> Put || Post 
const bodyParser = require('body-parser');
//Specifically Parse the JSON data and add it to the request.body obj.
app.use(bodyParser.json());
//Active the server in the port 3000
app.listen(3000, () =>{
    console.log("This is My server Run a 3000 Port!")
});

//  Create a Route.
app.get('/' , (request, response) =>{
    response.send("Hello Jee Kase ho sare!!")
});

//Create Our Own Route.
app.post('/api/cars' , (request, response) =>{
    const{name , brand} = request.body;
    console.log(name);
    console.log(brand);
    response.send("Car Submitte Successfully!")
});



//Connect between MongoDB and express Server.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    //This are the config that is need to be write.
    useNewUrlParser:true, 
    useUnifiedTopology:true,
})
//If connection is successful.
.then(() => {console.log("Connection Successful :)")})
.catch((error) =>{console.log("Recived an Error!")});
