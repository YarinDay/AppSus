import { NotePreview } from "./note-preview.jsx"

export class NoteList extends React.Component {

    render() {
        const { notes,
            onRemoveNote,
            onCopyNote,
            changeNoteBgc,
            onClickedPin } = this.props
        if (!notes || !notes.length) return <div>
            Loading...
        </div>
        return <section className="note-list-container">
            {notes.map((note) => <NotePreview
                onCopyNote={onCopyNote}
                onRemoveNote={onRemoveNote}
                changeNoteBgc={changeNoteBgc}
                onClickedPin={onClickedPin}
                key={note.id}
                note={note}
            />)}
        </section>
    }
}