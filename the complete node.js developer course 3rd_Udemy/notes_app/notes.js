const fs = require ('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    } 
}


const removeNote = (title) => {
    const notes = loadNotes()
    const remainNotes = notes.filter((note) => note.title !== title)

    if (notes.length > remainNotes.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(remainNotes)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(chalk.green(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note)=> note.title === title)
    if (noteToRead){
        console.log(chalk.inverse('Note title: ' + noteToRead.title))
        console.log('Note text: '+ noteToRead.body)
    } else {
        console.log(chalk.red.inverse('No note was found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON) 
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
} 