
import { storageService } from "../services/storageService.js"

export const noteService = {
    getNotes,
    _saveToStorage,
    _loadFromStorage,
    addNoteToNotes,
}
const KEY = 'notesDB'


function getNotes() {
    let notes = [
        {
            id: "n101",
            type: "note-txt",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: "n102",
            type: "note-img",
            info: {
                url: "http://some-img/me",
                title: "Bobi and Me"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: "n103",
            type: "note-todos",
            info: {
                label: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }
    ]
    return Promise.resolve(notes)
}

function addNoteToNotes(note) {
    console.log(note)
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





