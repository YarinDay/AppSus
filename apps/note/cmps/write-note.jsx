import { noteService } from "../services/note.service.js"
import { NotePreview } from "./note-preview.jsx"

export class WriteNote extends React.Component {

    state = {
        note: {
            // id: noteService.makeId(),
            type: 'note-txt',
            info: {
                text: '',
                title: '',
                url: '',
                link: '',
                todos: []
            },
            // isPinned: false
        }
    }

    componentDidUpdate() {
        // console.log('Updated')
    }

    saveDiff = (diff) => {
        this.setState({
            note: {
                info: {
                    text: '',
                    title: '',
                    url: '',
                    link: '',
                    todos: []
                },
                type: diff,
            }
        }
            // , console.log(this.state)
        )
    }

    resetState = () => {
        this.setState((prevState) => ({
            note: {
                ...prevState.note,
                info: {
                    text: '',
                    title: '',
                    url: '',
                    link: '',
                    todos: []
                }
            }
        }))

    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            note: {
                ...prevState.note,
                info: {
                    ...prevState.note.info,
                    [field]: value
                }
            }
        }))
        // if (field === 'todos') {
        //     this.setState(note.info.todos.push(value))
        // }

    }

    // handleChange = ({ target }) => {
    //     // const { type } = this.state
    //     const value = target.value
    //     if (target.name === 'title') {
    //         this.setState({ title: value })
    //         return
    //     }
    //     // this.setState({ [type]: value })
    //     this.setState({ text: value })
    // }

    saveNote = (ev) => {
        ev.preventDefault()
        const { type } = this.state
        this.props.onSaveNote(this.state.note)
        // this.setState({ title: '' })
        this.resetState()
    }

    get placeholder() {
        const { type } = this.state.note
        switch (type) {
            case 'note-txt':
                return 'Enter Text Here..'
            case 'note-img':
                return 'Enter URL Here..'
            case 'note-video':
                return 'Enter Link Here..'
            case 'note-todos':
                return 'Enter List with Separated ( , )..'
        }
    }

    render() {
        const { type } = this.state.note
        const { text, title, url, link, todos } = this.state.note.info
        const { handleChange, saveDiff, saveNote } = this

        return <section className="write-a-note">
            <form onSubmit={saveNote}>

                <label htmlFor="note-title"></label>
                <input
                    type="title"
                    name="title"
                    value={title}
                    placeholder='Enter Note Title'
                    id="note-title"
                    onChange={handleChange}
                />
                <label htmlFor="note-text-area"></label>
                {type === 'note-img' && <input
                    type="note-img"
                    name="url"
                    value={url}
                    placeholder={this.placeholder}
                    id="note-text-area"
                    onChange={handleChange}
                />}
                {type === 'note-video' && <input
                    type="note-video"
                    name="link"
                    value={link}
                    placeholder={this.placeholder}
                    id="note-text-area"
                    onChange={handleChange}
                />}
                {type === 'note-todos' && <input
                    type="note-todos"
                    name="todos"
                    value={todos}
                    placeholder={this.placeholder}
                    id="note-text-area"
                    onChange={handleChange}
                />}
                {type === 'note-txt' &&
                    <textarea
                        name="text"
                        id="note-text-area"
                        value={text}
                        placeholder={this.placeholder}
                        onChange={handleChange}
                        cols="30"
                        rows="10"
                    >
                    </textarea>
                }
                <section className="input-btns">
                    <img onClick={() => saveDiff('note-img')} src="assets/img/camera-png.png" />
                    <img onClick={() => saveDiff('note-video')} src="assets/img/video-png.png" />
                    <img onClick={() => saveDiff('note-todos')} src="assets/img/options-png.png" />
                    <img onClick={() => saveDiff('note-txt')} src="assets/img/text-png.png" />
                </section>
                <button className="submit-btn">Submit Note</button>
            </form>
        </section >
    }
}