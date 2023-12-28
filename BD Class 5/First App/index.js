const express = require('express');
const app = express();
const port = 3000;

//Middleware
app.use(express.json());


//Routes.
app.get('/', (req, res) =>{
    res.send(`<h1>THIS IS HEADING</h1>`)
});

app.post("/car", (req, res) =>{
    res.send("Recived a Post Request")
});

app.listen(port, () => {
    console.log(` App listening on port ${port}`)
});