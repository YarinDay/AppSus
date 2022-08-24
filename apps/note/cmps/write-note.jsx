import { noteService } from "../services/note.service.js"




export class WriteNote extends React.Component {

    state = {
        text: '',
        notes: [],
        type: 'text',
    }

    DynamicCmp = () => {

    }

    getDiff = (diff) => {
        this.setState({ type: diff })
    }

    componentDidMount() {
        noteService.getNotes()
            .then(notes => {
                this.setState({ notes })
            })
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ text: value })
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
        const { text, notes } = this.state
        const { handleChange, DynamicCmp, getDiff } = this

        if (!notes || !notes.length) return <div>Loading...</div>
        return <section className="write-a-note">
            {notes.map((note) => console.log(note))}

            <label htmlFor="note-text-area"></label>
            <input
                type="text"
                name="text"
                value={text}
                placeholder={this.placeholder}
                id="note-text-area"
                onChange={handleChange}
            />
            <section className="input-btns">
                <img onClick={() => getDiff('img')} src="../../assets/img/camera-png.png" />
                <img onClick={() => getDiff('video')} src="../../assets/img/video-png.png" />
                <img onClick={() => getDiff('options')} src="../../assets/img/options-png.png" />
                <img onClick={() => getDiff('text')} src="../../assets/img/text-png.png" />
            </section>
        </section>
    }
}

export class TextBox extends React.Component {


    render() {
        const { label } = this.props.info
        return <label>

            {label}
            <input type="text" />
        </label>
    }
}