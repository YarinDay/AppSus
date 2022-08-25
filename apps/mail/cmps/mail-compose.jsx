import { utilService } from "../../../services/util.service.js"


export class MailCompose extends React.Component {

    state = {
        newMail: {
            subject: '',
            body: '',
            isRead: false,
            sentAt: null,
            to: '',
            isSentToTrash: false,
            isStared: false
        }
    }

    intervalId = null

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({ newMail: this.state.newMail }, console.log(this.state.newMail))
        }, 5000)
    }

    componentWillUnmount() {
        const { newMail } = this.state
        if (!newMail.sentAt && newMail.to !== '') {
            this.props.onAddDraftMail(newMail)
            console.log('draft died!');
        }
        clearInterval(this.intervalId)
    }

    resetMailData = () => {
        this.setState({
            newMail: {
                subject: '',
                body: '',
                isRead: false,
                sentAt: null,
                to: '',
                isSentToTrash: false,
                isStared: false
            }
        })
    }

    onChangeNewMail = (ev) => {
        ev.preventDefault()
        const { newMail } = this.state
        if (newMail.to === '') return
        this.props.onAddMail(newMail, ev)
        this.resetMailData()
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState((prevState) => ({
            newMail: {
                ...prevState.newMail,
                [field]: value
            }
        }))
    }

    render() {
        // const { newMail } = this.state
        const { to, subject, body } = this.state.newMail
        return <section className="mail-compose-container">
            <div className="mail-compose-header">New Message</div>
            <form className="mail-compose-form" onSubmit={(ev) => this.onChangeNewMail(ev)}>
                <label htmlFor="to"></label>
                <input
                    type="text"
                    placeholder="addressee"
                    id="to"
                    name="to"
                    value={to}
                    onChange={this.handleChange}
                />
                <label htmlFor="subject"></label>
                <input
                    type="text"
                    placeholder="Subject"
                    id="subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <label htmlFor="body"></label>
                <textarea
                    type="text"
                    placeholder=""
                    id="new-mail-body"
                    name="body"
                    value={body}
                    onChange={this.handleChange}
                ></textarea>
                <div className="new-mail-tools"><button>Send</button></div>
            </form>
        </section>
    }
}
