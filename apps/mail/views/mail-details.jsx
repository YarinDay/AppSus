import { mailService } from "../services/mail.service.js"

export class MailDetails extends React.Component {

    state = {
        mail: null,
        mails: []
    }

    componentDidMount() {
        this.loadMail()
        this.loadMails()
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        mailService.getById(mailId)
            .then(mail => {
                if (!mail) return this.onGoBack()
                this.setState({ mail })
            })
    }
    loadMails() {
        mailService.query()
            .then((mails) => this.setState({ mails }))
    }
    onGoBack = () => {
        this.props.history.push('/mail')
    }

    render() {
        const { mail } = this.state
        if (!mail) return <div>Loading...</div>
        return <section className="flex column align-center">
                <h3>{mail.subject}</h3>
                <h3>{mail.body}</h3>
                <h3>{mail.sentAt}</h3>

            Hellow from mail details
        </section>
    }

}