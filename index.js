const { urlencoded } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
var port = process.env.PORT | 4000;

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(stream)
app.use('/upload', require('./routes/route'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'public', "images")));
// app.use(bodyParser());

app.get('/', (req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get('/404-page', (req, res) => {
    console.log(req.url)
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
app.listen(port, () => {
    console.log("Server ", port)
});