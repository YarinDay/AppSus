import { NoteList } from "../cmps/note-list.jsx"
import { WriteNote } from "../cmps/write-note.jsx"
import { noteService } from "../../note/services/note.service.js"

export class NoteIndex extends React.Component {

    state = {
        notes: [],
    }

    componentDidMount() {
        this.loadNotes()
    }

    componentDidUpdate(prevProps, prevState) {
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId)
            .then((notes) => this.setState({ notes }))
        // .then(notes => this.props.onRemoveNote(notes))
        // this.setState({ notes })
    }

    onCopyNote = (notes) => {
        this.setState({ notes })
    }

    onSaveNote = (note) => {
        noteService.saveNote(note)
            .then(notes => this.setState({ notes }))
        // this.loadNotes()
    }

    //todo - Add the note to the notes array
    //Todo - SetState so it can Re-Render

    render() {
        const { notes } = this.state
        const { onSaveNote, onRemoveNote, onCopyNote } = this

        if (!notes || !notes.length) return <section>
            <WriteNote
                onSaveNote={onSaveNote}
            />
            <h1>No Notes At The Moment...</h1>
        </section>
        return <section className="note-index">

            <h1>__AppSus Notes__</h1>
            <WriteNote
                onSaveNote={onSaveNote}
            />
            <NoteList
                notes={this.state.notes} onRemoveNote={onRemoveNote} onCopyNote={onCopyNote} />
        </section>
    }
}