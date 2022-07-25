//setting path
const path = require('path');
//requring fs module
const fs = require("fs")
//setting port
const PORT = process.env.PORT || 8080

// requiring the express module
const express = require("express")
const app = express()

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());













app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});