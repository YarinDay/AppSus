import { noteService } from "../services/note.service.js"

export class WriteNote extends React.Component {

    state = {
        text: '',
        type: 'text'
    }

    saveDiff = (diff) => {
        this.setState({ type: diff })
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
        const { handleChange, DynamicCmp, saveDiff } = this

        return <section className="write-a-note">

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
                <img onClick={() => saveDiff('img')} src="assets/img/camera-png.png" />
                <img onClick={() => saveDiff('video')} src="assets/img/video-png.png" />
                <img onClick={() => saveDiff('options')} src="assets/img/options-png.png" />
                <img onClick={() => saveDiff('text')} src="assets/img/text-png.png" />
            </section>
        </section>
    }
}