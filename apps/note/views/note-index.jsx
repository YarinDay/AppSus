import { NoteList } from "../cmps/note-list.jsx"
import { WriteNote } from "../cmps/write-note.jsx"
import { noteService } from "../../note/services/note.service.js"

export class NoteIndex extends React.Component {

    state = {
        notes: [],
    }

    componentDidMount() {
        this.loadNotes()
        console.log('Updated', this.state.notes)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps', prevProps)
        console.log('prevState', prevState)
        console.log('Updated', this.state.notes)
    }

    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }

    onSaveNote = (note) => {
        // let { notes } = this.state
        debugger
        noteService.saveNote(note)
            .then(notes => this.setState({ notes }))
            console.log(this.state)
        // this.loadNotes()
    }

    //todo - Add the note to the notes array
    //Todo - SetState so it can Re-Render

    render() {
        const { notes } = this.state
        const { onSaveNote } = this

        if (!notes || !notes.length) return <div>Loading...</div>
        return <section className="note-index">

            <h1>__AppSus Notes__</h1>
            <WriteNote onSaveNote={onSaveNote} />
            <NoteList notes={this.state.notes} />
        </section>
    }
}