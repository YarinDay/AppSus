import { noteService } from "../services/note.service.js"




export class WriteNote extends React.Component {

    state = {
        txt: '',
        notes: []
    }

    DynamicCmp = () => {

    }

    componentDidMount() {
        noteService.getNotes()
            .then(notes => {
                this.setState({ notes })
            })
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState({ txt: value })
        console.log(this.state.notes[0])
        console.log(this.state.notes)
    }

    render() {
        const { txt, notes } = this.state
        const { handleChange, DynamicCmp } = this

        if (!notes || !notes.length) return <div>Loading...</div>
        return <section className="write-a-note">
            {console.log(notes)}
            {notes.map((note) => console.log(note))}

            <label htmlFor="note-txt-area"></label>
            <input
                type="text"
                name="txt"
                value={txt}
                id="note-txt-area"
                onChange={handleChange}
            />
            <section className="input-btns">
                <img src="../../assets/img/camera-png.png" />
                <img src="../../assets/img/video-png.png" />
                <img src="../../assets/img/options-png.png" />
                <img src="../../assets/img/text-png.png" />
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



//Done - Create Input Thats got a txt area
//Done -  and title area
//Done - Create Buttons For(Image, Video, Text, Commas)