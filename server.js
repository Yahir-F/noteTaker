//setting path
const path = require('path');
//requring fs module
const noteData = require('./db/db.json');
const fs = require("fs")
//setting port
const PORT = process.env.PORT || 8080

// requiring the express module
const express = require("express")
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './public/index.html'));
});












app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});