import { noteService } from "../services/note.service.js"

export class WriteNote extends React.Component {

    state = {
        img: '',
        text: '',
        type: 'text',
        title: '',
        video: '',
        options: []
    }

    saveDiff = (diff) => {
        this.setState({ type: diff })
    }

    handleChange = ({ target }) => {
        const { type } = this.state
        const value = target.value
        if(target.id === 'note-title') {
            this.setState({ title: value })
            return
        }
        this.setState({[type]: value})
        this.setState({ text: value })
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        console.log(this.state)
        //todo - Save the note and unShift it to the notes array
        //todo - create a add function in noteService
    }

    get placeholder() {
        const { type } = this.state
        switch (type) {
            case 'text':
                return 'Enter Text Here..'
            case 'img':
                return 'Enter URL Here..'
            case 'video':
                return 'Enter Link Here..'
            case 'options':
                return 'Enter List with Separated ( , )..'
        }
    }

    render() {
        const { text, type, title } = this.state
        const { handleChange, saveDiff } = this

        return <section className="write-a-note">
            <form onSubmit={this.onSaveNote}>

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
                {type !== 'text' && <input
                    type="text"
                    name="text"
                    value={text}
                    placeholder={this.placeholder}
                    id="note-text-area"
                    onChange={handleChange}
                />}
                {type === 'text' &&
                    <textarea name="text"
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
                    <img onClick={() => saveDiff('img')} src="assets/img/camera-png.png" />
                    <img onClick={() => saveDiff('video')} src="assets/img/video-png.png" />
                    <img onClick={() => saveDiff('options')} src="assets/img/options-png.png" />
                    <img onClick={() => saveDiff('text')} src="assets/img/text-png.png" />
                </section>
                <button className="submit-btn">Submit Note</button>
            </form>
        </section >
    }
}