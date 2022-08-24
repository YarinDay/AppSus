import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

export class MailIndex extends React.Component {

    state = {
        mails: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails() {
        mailService.query(this.state.filterBy)
            .then((mails) => this.setState({ mails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }

    onReadMail = (mail, idx) => {
        console.log(mail, idx)
        const { mails } = this.state
        if (mail.isRead === false) {
            mails[idx].isRead = true
            // this.setState({ mails[idx].isRead: true })
            this.setState({mails: mails[idx]})
        }
        this.loadMails()
        console.log(mails);
    }

    render() {
        const { mails } = this.state
        return <section className="mail-index">
            <div className="menu-logos">
                <img className="grid-menu-logo" src="assets/img/grid-menu.png" />
                <img className="inbox-logo" src="assets/img/inbox.png" />
                <img className="star-logo" src="assets/img/star-logo.png" />
                <img className="new-mail-logo" src="assets/img/new-mail-logo.png" />
                <img className="sent-logo" src="assets/img/sent-logo.png" />
            </div>
            <h1>mail app</h1>
            <MailList mails={mails} onReadMail={this.onReadMail} />
            <MailFilter onSetFilter={this.onSetFilter} />
        </section>
    }
}
