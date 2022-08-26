

export class NoteBgcChanger extends React.Component {

    changeBgc = (ev) => {
        let color = ev.target.attributes.name.nodeValue
        const { id } = this.props.note
        let { changeNoteBgc } = this.props
        changeNoteBgc(id, color)
    }

    render() {
        return <section className="note-bgc-changer">
            <div className="change-color-container">
                <div onClick={(ev) => this.changeBgc(ev)} name={'#78a7a7'} className="bgc bgc-default"></div>
                <div onClick={(ev) => this.changeBgc(ev)} name={'#954242'} className="bgc bgc-red"></div>
                <div onClick={(ev) => this.changeBgc(ev)} name={'#41a43f'} className="bgc bgc-green"></div>
                <div onClick={(ev) => this.changeBgc(ev)} name={'#3046a8'} className="bgc bgc-blue"></div>
                <div onClick={(ev) => this.changeBgc(ev)} name={'#cbd3cb'} className="bgc bgc-white"></div>
                <div onClick={(ev) => this.changeBgc(ev)} name={'#8542aa'} className="bgc bgc-purple"></div>
                <div onClick={(ev) => this.changeBgc(ev)} name={'#bf2bc7'} className="bgc bgc-pink"></div>
                <div onClick={(ev) => this.changeBgc(ev)} name={'#cece35'} className="bgc bgc-yellow"></div>
                <div onClick={(ev) => this.changeBgc(ev)} name={'#4bceb3'} className="bgc bgc-aqua"></div>
            </div>
        </section>
    }
}