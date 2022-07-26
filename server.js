//setting port
const PORT = process.env.PORT || 8080
const fs = require("fs")
// requiring the express module
const express = require("express")
const app = express()
//setting path
const path = require('path');
//requring fs module
const noteConfig = require('./db/db.json');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



app.get('/api/notes', (req, res) => {
    res.json(noteConfig.slice(1));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './public/index.html'));
});
//creating function to create a new note
function addNewNote(noteBody, notesData) {
    const noteNew = noteBody;
    if(!Array.isArray(notesData)) 
        notesData = [];

        if(notesData.length === 0) {
            notesData.push(0);
        }
    noteBody.id = notesData[0]
    notesData[0]++;

    notesData.push(noteNew);
    fs.writeFileSync(
        path.join(__dirname, "db/db.json"),
        JSON.stringify(notesData, null)
    );
    return noteNew
}
//route
app.post('/api/notes', (req, res) => {
    const noteNew = addNewNote(req.body, noteConfig);
    res.json(noteNew);
});
//remove note function 
function noteRemove(id, notesData) {
   
    for(let i = 0; i < notesData.length; i++) {
     
        let info = notesData[i];
        if(info.id === id) {
            notesData.splice(i, 1);
        
            fs.writeFileSync(
                path.join(__dirname, "db/db.json"),
      
                JSON.stringify(notesData, null)
            );
            break;
        }
    }
}





app.delete('/api/notes/:id', (req, res) => {
    noteRemove(req.params.id, noteConfig);
    res.json(true);
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});