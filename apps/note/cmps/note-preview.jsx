import { NoteToolBar } from "./note-tool-bar.jsx"
import { noteService } from "../services/note.service.js"

export function NotePreview({ note }) {

    function DynamicCmp({ note }) {
        switch (note.type) {
            case 'note-txt':
                return <TextBox note={note} />
            case 'note-img':
                return <ImgBox note={note} />
            case 'note-video':
                return <VideoBox note={note} />
            case 'note-todos':
                return <TodosBox note={note} />
        }
    }

    return <section className="note-preview">
        <DynamicCmp note={note} />
        <NoteToolBar />
    </section>
}

export function TextBox({ note }) {
    let isPin = (note.isPinned) ? 'black' : 'white'

    return <section className="text-box-container box-container">
        <span className="pin-btn">
            <img src={`assets/img/${isPin}-pin.png`} />
        </span>
        <span className="note-title">{note.info.title}</span>
        <span className="note-text">{note.info.txt}</span>
    </section>
}

export function ImgBox({ note }) {
    let isPin = (note.isPinned) ? 'black' : 'white'

    return <section className="image-box-container box-container">
        <span className="pin-btn">
            <img src={`assets/img/${isPin}-pin.png`} />
        </span>
        <span className="note-title">{note.info.title}</span>
        <div className="img-container"><img src={note.info.url} /></div>
    </section>
}

export function VideoBox({ note }) {
    let isPin = (note.isPinned) ? 'black' : 'white'

    return <section className="video-box-container box-container">
        <span className="pin-btn">
            <img src={`assets/img/${isPin}-pin.png`} />
        </span>
        <span className="note-title">{note.info.label}</span>
        <iframe src={note.info.link} width="100%" height="95%"></iframe>
    </section>
}

export function TodosBox({ note }) {
    let isPin = (note.isPinned) ? 'black' : 'white'

    return <section className="todos-box-container box-container">
        <span className="pin-btn">
            <img src={`assets/img/${isPin}-pin.png`} />
        </span>
        <span className="note-title">{note.info.label}</span>
        <ul>
            {note.info.todos.map(todo => <li key={noteService.makeId()}>{todo.txt} Done At: {todo.doneAt}</li>)}
        </ul>
    </section>
}