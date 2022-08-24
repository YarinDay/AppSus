import { NoteList } from "../cmps/note-list.jsx"
import { WriteNote } from "../cmps/write-note.jsx"
import { noteService } from "../../note/services/note.service.js"

export class NoteIndex extends React.Component {
    
    state = {
        notes: [],
    }

    componentDidMount() {
        noteService.getNotes()
            .then(notes => {console.log(notes)
                this.setState({ notes })
            })
    }

    onSaveNote = (note) => {
        noteService.addNoteToNotes(note)
            .then(console.log(this.props))
    }

    render() {
        const { notes } = this.state

        if (!notes || !notes.length) return <div>Loading...</div>
        return <section className="note-index">

            <h1>__AppSus Notes__</h1>
            <WriteNote onSaveNote={this.onSaveNote} />
            <NoteList notes={this.state.notes} />
        </section>
    }
}
//Todo1 - Show the Notes 
//Todo1 - Add Notes from Write Note 