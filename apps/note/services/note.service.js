
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
    note.style.backgroundColor = '#4f5d5d'
    let notes = _loadFromStorage()
    if (note.info.todos) note.info.todos = note.info.todos.split(',')
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

function changeBgc(noteId, bgcColor) {
    let notes = _loadFromStorage()
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].style.backgroundColor = bgcColor + ''
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
            imgUrl: note.info.imgUrl,
            gifUrl: note.info.gifUrl,
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
            id: makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                imgUrl: "https://media0.giphy.com/media/gePUWJ4AXHu92/giphy.gif?cid=ecf05e4723asuxpwmrooeyq2syxaoyw630dm0sgnuodkm97o&rid=giphy.gif&ct=g"
            },
            style: {
                backgroundColor: "#4f5d5d"
            }
        },
        {
            id: makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: "I am nobody...",
                text: "Nobody is perfect. I am perfect."
            },
            style: {
                backgroundColor: "#4f5d5d"
            }
        },
        {
            id: makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                imgUrl: "https://static1.srcdn.com/wordpress/wp-content/uploads/2019/11/Jerry-Rick-Morty-Featured-Social-1710x900.jpg?q=50&fit=contain&w=943&h=&dpr=1.5"
            },
            style: {
                backgroundColor: "#4f5d5d"
            }
        },
        {
            id: makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                imgUrl: "https://media2.giphy.com/media/cL4pqu8GGRIihabgSM/giphy.gif?cid=ecf05e47xfziqfnp397in22l4mggmqmwlje2no7l38kbgsj1&rid=giphy.gif&ct=g"
            },
            style: {
                backgroundColor: "#4f5d5d"
            }
        },
        {
            id: makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: "I wouldn't exactly say I'm lazy ",
                text: " but it's a good thing that breathing is a reflex."
            },
            style: {
                backgroundColor: "#4f5d5d"
            }
        },
        {
            id: makeId(),
            type: "note-todos",
            isPinned: false,
            info: {
                title: "Todo's :",
                todos: [
                    "Sleep more than 2 hours ",
                    "Finish Coding Academy tasks on time",
                    "Don't afraid when Yaron is yelling at you!"
                ]
            },
            style: {
                backgroundColor: "#3046a8"
            }
        },
        {
            id: makeId(),
            type: "note-video",
            isPinned: false,
            info: {
                title: "Drake - Laugh Now Cry Later",
                link: 'https://www.youtube.com/embed/watch?v=JFm7YDVlqnI'
            },
            style: {
                backgroundColor: "#4f5d5d"
            }
        },
        {
            id: makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                imgUrl: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
            },
            style: {
                backgroundColor: "#4f5d5d"
            }
        },
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