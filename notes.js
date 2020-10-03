const fs = require('fs');
const { title } = require('process');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
        return notes;
    }
    catch (e) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = [];
    var note = {
        title,
        body
    };
    notes = fetchNotes();
    var duplicateNotes = notes.filter((note) => note.title == title)
    if (duplicateNotes.length == 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

var updateNote = (title, body) => {
    var notes = [];
    var note = {
        title,
        body
    }
    notes = fetchNotes();
    var duplicateNotes = notes.filter((note) => note.title == title)
    if (duplicateNotes.length == 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        var newNotes = notes.filter((note) => note.title !== title);
        newNotes.push(note);
        saveNotes(newNotes);
        return note;
    }
}
var getAll = () => {
    return fetchNotes();
};
var removeNote = (title) => {
    var notes = fetchNotes();
    var newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes);
    return notes.length !== newNotes.length;
};
var getNote = (title) => {
    var notes = fetchNotes();
    var noteReq = notes.filter((note) => note.title == title);
    return noteReq[0];
};
var logNote = (note) => {
    console.log('--');
    console.log('Title ' + note.title);
    console.log('Body ' + note.body);
};
module.exports = {
    addNote,
    getAll,
    removeNote,
    updateNote,
    getNote,
    logNote
};