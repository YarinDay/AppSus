import { NotePreview } from "./note-preview.jsx"

export function NoteList({ notes }) {

    if (!notes || !notes.length) return <div>Loading...</div>
    return <section className="note-list-container">
        
        {notes.map((note) => <NotePreview key={note.id} note={note} />)}
        {/* {notes.map((note) => <DynamicCmp key={note.id} note={note} />)} */}
    </section>
}
