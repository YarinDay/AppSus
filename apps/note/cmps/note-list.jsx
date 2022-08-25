import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes }) {
    console.log(notes)
    if (!notes || !notes.length) return <div>Loading...</div>
    return <section className="note-list-container">
        {notes.map((note) => <NotePreview key={note.id} note={note} />)}
    </section>
}
