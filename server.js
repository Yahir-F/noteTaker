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



app.get('/api/notes', (req, res) => {
    res.json(noteData);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + './public/index.html'));
});
//creating function to create a new note
function addNewNote(noteBody, noteData) {
    const noteNew = noteBody;
    if(!Array.isArray(noteData)) 
        noteData = [];

        if(noteData.length === 0) {
            noteData.push(newNote);
        }
    noteBody.id = noteData[0]
    noteBody[0]++;
    noteData.push(newNote);

    
    fs.writeFileSync(
        path.join(__dirname, "db/db.json"),
        JSON.stringify(noteData, null)
    );
    return noteNew
}
//route
app.post('/api/notes', (req, res) => {
    const noteNew = addNewNote(req.body, noteData);
    res.json(noteNew);
});
//remove note function 
function noteRemove(id, noteData) {
   
    for(let i = 0; i < noteData.length; i++) {
     
        let info = noteData[i];
        if(info.id === id) {
            noteData.splice(i, 1);
        
            fs.writeFileSync(
                path.join(__dirname, "db/db.json"),
      
                JSON.stringify(noteData, null)
            );
            break;
        }
    }
}





app.delete('/api/notes/:id', (req, res) => {
    noteRemove(req.params.id, noteData);
    res.json(noteData);
});





app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});