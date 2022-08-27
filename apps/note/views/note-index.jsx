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

    loadNotes = () => {
        noteService.query()
            .then(notes => {
                this.setState({ notes })
            })
    }

    onRemoveNote = (noteId) => {
        noteService.removeNote(noteId)
            .then((notes) => this.setState({ notes }))
    }

    onCopyNote = (note) => {
        noteService.copyNote(note)
            .then((notes) => this.setState({ notes }))
    }

    changeNoteBgc = (noteId, bgcColor) => {
        noteService.changeBgc(noteId, bgcColor)
            .then((notes) => this.setState({ notes }))
    }

    onSaveNote = (note) => {
        if (note.info.text === '' && note.info.title === '') return
        noteService.saveNote(note)
            .then(notes => this.setState({ notes }))
    }

    onClickedPin = (noteId) => {
        noteService.changeNotePinStatus(noteId)
            .then((notes) => this.setState({ notes }))
    }

    render() {
        const { notes } = this.state
        const { onSaveNote, onRemoveNote, onCopyNote, changeNoteBgc, onClickedPin } = this

        if (!notes || !notes.length) return <section>
            <WriteNote
                onSaveNote={onSaveNote}
            />
            <h1>No Notes At The Moment...</h1>
        </section>
        return <section className="note-index">

            <h1 className="main-appsus-title">__AppSus Notes__</h1>
            <WriteNote
                onSaveNote={onSaveNote}
            />
            <NoteList
                notes={this.state.notes}
                onRemoveNote={onRemoveNote}
                onCopyNote={onCopyNote}
                changeNoteBgc={changeNoteBgc}
                onClickedPin={onClickedPin}
            />
        </section>
    }
}