import { NoteBgcChanger } from "./note-bgc-change.jsx"

export class NoteToolBar extends React.Component {

    state = {
        isBgcOpen: false,
        isPinned: false
    }

    onChangeBgc = () => {
        this.setState({ isBgcOpen: !this.state.isBgcOpen })
    }

    onCheckPinned = () => {
        this.props.onClickedPin(this.props.note.id)
    }

    render() {
        const { isBgcOpen } = this.state
        const { note, changeNoteBgc } = this.props
        let isPin = (note.isPinned) ? 'black' : 'white'

        return <section style={{ backgroundColor: note.style.backgroundColor }} className="tool-bar-container">
            <img onClick={this.props.onRemoveNote} src="assets/img/trash-png.png" />
            <img onClick={this.props.onCopyNote} src="assets/img/copy-note-png.png" />
            <img onClick={this.onChangeBgc} src="assets/img/change-bgc-png.png" />
            <img onClick={this.onCheckPinned} src={`assets/img/${isPin}-pin.png`} />
            {isBgcOpen && <NoteBgcChanger note={this.props.note} changeNoteBgc={changeNoteBgc} />}
        </section>
    }
}