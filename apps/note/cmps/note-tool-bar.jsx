import { noteService } from "../services/note.service.js"


export class NoteToolBar extends React.Component {

    // onCopyNote = () => {
    //     const { note } = this.props
    //     noteService.copyNote(note)
    //         .then(notes => this.props.onCopyNote(notes))
    // }

    render() {
        return <section className="tool-bar-container">
            <img src="assets/img/forward-png.png" />
            <img onClick={this.props.onRemoveNote} src="assets/img/trash-png.png" />
            {/* <img onClick={this.onCopyNote} src="assets/img/copy-note-png.png" /> */}
            <img src="assets/img/change-bgc-png.png" />
        </section>
    }
}