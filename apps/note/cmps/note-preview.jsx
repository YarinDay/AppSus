import { NoteToolBar } from "./note-tool-bar.jsx"

export class NotePreview extends React.Component {

    onRemoveNote = () => {
        const { note } = this.props
        this.props.onRemoveNote(note.id)
    }

    onCopyNote = () => {
        const { note } = this.props
        this.props.onCopyNote(note)
    }

    DynamicCmp = () => {
        const { note } = this.props
        switch (note.type) {
            case 'note-txt':
                return <TextBox note={note} />
            case 'note-img':
                return <ImgBox note={note} />
            case 'note-video':
                return <VideoBox note={note} />
            case 'note-todos':
                return <TodosBox note={note} />
            case 'note-gif':
                return <GifBox note={note} />
        }
    }

    render() {
        const { note, changeNoteBgc, onClickedPin } = this.props
        return <section className="note-preview">
            {this.DynamicCmp(note)}
            <NoteToolBar
                onCopyNote={this.onCopyNote}
                onRemoveNote={this.onRemoveNote}
                changeNoteBgc={changeNoteBgc}
                note={note}
                onClickedPin={onClickedPin}
            />
        </section>
    }
}

export function TextBox({ note }) {
    return <section style={{ backgroundColor: note.style.backgroundColor }} className="text-box-container box-container" >
        <span className="note-title">{note.info.title}</span>
        <span className="note-text">{note.info.text}</span>
    </section >
}

export function ImgBox({ note }) {
    return <section style={{ backgroundColor: note.style.backgroundColor, backgroundImage: `url(note.info.url)` }} className="image-box-container box-container">
        <div className="img-container"><img src={note.info.imgUrl} /></div>
        <span className="note-title note-title-img">{note.info.title}</span>
    </section>
}

export function GifBox({ note }) {
    return <section style={{ backgroundColor: note.style.backgroundColor, backgroundImage: `url(note.info.url)` }} className="image-box-container box-container">
        <div className="gif-container"><img src={note.info.gifUrl} /></div>
        <span className="note-title note-title-img">{note.info.title}</span>
    </section>
}

export function VideoBox({ note }) {
    return <section style={{ backgroundColor: note.style.backgroundColor }} className="video-box-container box-container">
        <span className="note-title">{note.info.title}</span>
        <iframe  type="video/mp4" src={note.info.link} width="100%" height="95%"></iframe>
    </section>
}

export class TodosBox extends React.Component {

    render() {
        const { note } = this.props
        if (!note.info.todos) return <div>No Todos For Now...</div>

        return <section style={{ backgroundColor: note.style.backgroundColor }} className="todos-box-container box-container">
            <span className="note-title">{note.info.title}</span>
            <ul>
                {/* {note.info.todos.map(todo => {
                    <input type="checkbox" name={note.id} id={note.id}>
                        <label value={todo} htmlFor={note.id}> {todo}</label>
                    </input>
                })} */}
                {note.info.todos.map(todo => <li className="each-todo" key={note.id}>{todo}</li>)}
            </ul>
        </section>
    }
}