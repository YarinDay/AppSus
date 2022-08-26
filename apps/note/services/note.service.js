
import { storageService } from "../services/storageService.js"

export const noteService = {
    getNotes,
    makeId,
    query,
    saveNote,
    removeNote,
    copyNote,
    changeBgc,
    changeNotePinStatus,
}
const KEY = 'notesDB'

function query(note) {
    let notes = _loadFromStorage()

    if (!notes || !notes.length) {
        notes = getNotes()
        _saveToStorage(notes)
    }
    return Promise.resolve(notes)
}

function saveNote(note) {
    note.id = makeId()
    note.isPinned = false
    note.style = {}
    note.style.backgroundColor = '#78a7a7'
    let notes = _loadFromStorage()
    if (note.info.todos) note.info.todos = note.info.todos.split(',')
    if (!notes || !notes.length) {
        notes = getNotes()
        _saveToStorage(notes)
        return Promise.resolve(notes)
    }
    notes.unshift(note)
    _saveToStorage(notes)
    console.log('note :', note)
    return Promise.resolve(notes)
}

function removeNote(noteId) {
    console.log('noteId :', noteId)
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes.splice(noteIdx, 1)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function changeBgc(noteId, bgcColor) {
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].style.backgroundColor = bgcColor + ''
    console.log('notes[noteIdx] :', notes[noteIdx])
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function copyNote(note) {
    let notes = _loadFromStorage()
    const newNote = _createCopyNote(note)
    notes.unshift(newNote)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function changeNotePinStatus(noteId) {
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    let note = notes[noteIdx]
    note.lastNoteIdx = noteIdx
    note.isPinned = !note.isPinned

    // if(!notes.includes(note)) {
    if (note.isPinned) {
        let kaki = notes.splice(noteIdx, 1)
        notes.unshift(kaki[0])
    }
    else if (!note.isPinned) {
        let kaki = notes.splice(noteIdx, 1)
        notes.push(kaki[0])
    }
    // }
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
        style: {
            backgroundColor: note.style.backgroundColor
        }
    }
    return newNote
}

function getNotes() {
    let notes = [
        {
            id: "n101",
            type: "note-txt",
            isPinned: false,
            info: {
                title: "I am nobody...",
                text: "Nobody is perfect. I am perfect."
            },
            style: {
                backgroundColor: "#78a7a7"
            }
        },
        {
            id: "n102",
            type: "note-img",
            isPinned: false,
            info: {
                url: "https://i.chzbgr.com/full/9604474880/h5D16816F/dog",
                title: "That's Bobi"
            },
            style: {
                backgroundColor: "#78a7a7"
            }
        },
        {
            id: "n103",
            type: "note-txt",
            isPinned: false,
            info: {
                title: "I wouldn't exactly say I'm lazy, ",
                text: " but it's a good thing that breathing is a reflex."
            },
            style: {
                backgroundColor: "#78a7a7"
            }
        },
        {
            id: "n104",
            type: "note-todos",
            isPinned: false,
            info: {
                title: "Finish This!!!!!",
                todos: [
                    "Driving liscence" ,
                    "Coding power" 
                ]
            },
            style: {
                backgroundColor: "#78a7a7"
            }
        },
        {
            id: "n105",
            type: "note-video",
            isPinned: false,
            info: {
                title: "Go-Pro Awards",
                link: 'http://www.youtube.com/embed/watch?v=3bRgp_GSyBQ'
            },
            style: {
                backgroundColor: "#78a7a7"
            }
        },
        {
            id: "n106",
            type: "note-img",
            isPinned: false,
            info: {
                url: "../../assets/img/random-shrek.png",
                title: "Shreki <3"
            },
            style: {
                backgroundColor: "#78a7a7"
            }
        },
        {
            id: "n107",
            type: "note-video",
            isPinned: false,
            info: {
                label: "BMX Extreme Video",
                link: 'http://www.youtube.com/embed/watch?v=13OtZFWdhwQ'
            },
            style: {
                backgroundColor: "#78a7a7"
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

function _saveToStorage(note) {
    storageService.saveToStorage(KEY, note)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}