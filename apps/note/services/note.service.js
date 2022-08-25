
import { storageService } from "../services/storageService.js"

export const noteService = {
    getNotes,
    addNoteToNotes,
    makeId,
    query,
    saveNote,
    getFixedTodos,
    removeNote,
    copyNote,
}
const KEY = 'notesDB'

function query(note) {
    let notes = _loadFromStorage()

    if (!notes || !notes.length) {
        notes = getNotes()
        _saveToStorage(notes)
    }
    // notes.push(note)
    return Promise.resolve(notes)
}

function saveNote(note) {
    note.id = makeId()
    note.isPinned = false
    let notes = _loadFromStorage()
    if (!notes || !notes.length) {
        notes = getNotes()
        _saveToStorage(notes)
        return Promise.resolve(notes)
    }
    notes.unshift(note)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function removeNote(noteId) {
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes.splice(noteIdx, 1)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function copyNote(note) {
    console.log('Note :', note)
    let notes = _loadFromStorage()
    const newNote = _createCopyNote(note)
    notes.unshift(newNote)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function _createCopyNote(note) {
    let newNote = {
        type: note.type,
        id: makeId(),
        info: {
            text: note.info.text,
            title: note.info.title,
            url: note.info.url,
            link: note.info.link,
            todos: note.info.todos
        },
    }
    return newNote
}

function getFixedTodos(todos) {
    // console.log('todos :', todos)
}


function getNotes() {
    let notes = [
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                title: "Fullstack Me Baby!",
                txt: "I just typeBullshit right here..."
            }
        },
        {
            id: "n102",
            type: "note-img",
            isPinned: false,
            info: {
                url: "../../assets/img/random-dog.jfif",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            isPinned: false,
            info: {
                title: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        },
        {
            id: "n104",
            type: "note-video",
            isPinned: true,
            info: {
                title: "Go-Pro Awards",
                link: 'http://www.youtube.com/embed/watch?v=3bRgp_GSyBQ'
            }
        },
        {
            id: "n105",
            type: "note-img",
            isPinned: false,
            info: {
                url: "../../assets/img/random-shrek.png",
                title: "Shreki <3"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n106",
            type: "note-video",
            isPinned: false,
            info: {
                label: "BMX Extreme Video",
                link: 'http://www.youtube.com/embed/watch?v=13OtZFWdhwQ'
            }
        }
    ]
    return notes
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}


function addNoteToNotes(note) {
    // let notes = getNotes()
    //     .then(notes => {
    //         notes = [note, ...notes]
    //         _saveToStorage(note)
    //         return Promise.resolve(note)
    //     })
}

function _saveToStorage(note) {
    storageService.saveToStorage(KEY, note)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}





