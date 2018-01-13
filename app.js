const fs=require('fs');
const os=require('os');
const _=require('lodash');
const yargs=require('yargs');

const notes=require('./notes.js');

const titleOptions={
    describe:'Title',
    demand:true,
    alias:'t' 
}; 
var argv=yargs
.command('add','Add new note',{
    title: titleOptions,
    body:{
        describe:'Body of the note',
        demand:true,
        alias:'b',
    }
})
.command('list','List all notes')
.command('read','Read a note',{
    title: titleOptions
})
.command('remove','Remove a note',{
    title: titleOptions
})
.help()
.argv;
var command=argv._[0];

if(command==='add'){
    var note=notes.addNote(argv.title,argv.body);
    if(note==undefined){
            console.log("Title already exists");
        }
    else{
            notes.logNote(note);
        }
}
else if(command=='list'){
    var allNotes=notes.getAll();
    allNotes.forEach((note)=>notes.logNote(note));
}
else if(command=='remove'){
    var info=notes.removeNote(argv.title);
    var msg=info?'Note removed':'No note with given title exists';
    console.log(msg);
}
else if(command=='read'){
    var note=notes.getNote(argv.title);
    if(note){
        notes.logNote(note);
    }
    else{
        console.log('Note not found');
    }
}
else{
    console.log('Command not recognized');
}