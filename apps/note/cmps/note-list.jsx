import { NotePreview } from "./note-preview.jsx"

export class NoteList extends React.Component {

    onCopyNote = (notes) => {
        this.props.onCopyNote(notes)
    }

    render() {
        const { notes, onRemoveNote } = this.props
        if (!notes || !notes.length) return <div>
            Loading...
            </div>
        return <section className="note-list-container">
            {notes.map((note) => <NotePreview onCopyNote={this.onCopyNote} onRemoveNote={onRemoveNote} key={note.id} note={note} />)}
        </section>
    }
}




// export function NoteList({ notes }) {
//     if (!notes || !notes.length) return <div>Loading...</div>
//     return <section className="note-list-container">
//         {notes.map((note) => <NotePreview key={note.id} note={note} />)}
//     </section>
// }
