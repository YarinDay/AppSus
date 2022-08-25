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

    componentDidUpdate(prevProps, prevState) {
        this.showUnreadMails()
        // console.log(prevState);
        // console.log('this state', this.state);

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

    onReadMail = (mailId) => {
        // mails[idx].isRead = true
        mailService.markAsRead(mailId)
        console.log(this.state.mails);
        // this.setState((prevState) => {
        //     const { mails } = prevState
        //     mails.map(mail => {
        //         if (mail.id === mailId) mail.isRead = true
        //     })
        // })
        // this.setState({ mails[idx].isRead: true })
        this.loadMails()
    }

    onRemoveMail = (mailId) => {
        console.log('Removed!', mailId);
        mailService.sendToTrash(mailId)
        this.loadMails()
    }

    showUnreadMails = () => {
        const { mails } = this.state
        let unreadMails = 0
        mails.map(mail => {
            if (!mail.isRead) unreadMails++
        })
        return unreadMails
    }

    render() {
        const { mails } = this.state
        return <section className="mail-index">
            <div className="menu-logos">
                <div><img className="grid-menu-logo filter-logo" src="assets/img/grid-menu.png" /></div>
                <div className="inbox-filter-container"><img className="inbox-logo filter-logo" src="assets/img/inbox.png" /><span className="unread-mails-count">{this.showUnreadMails()}</span></div>
                <div><img className="star-logo filter-logo" src="assets/img/star-logo.png" /></div>
                <div><img className="new-mail-logo filter-logo" src="assets/img/new-mail-logo.png" /></div>
                <div><img className="sent-logo filter-logo" src="assets/img/sent-logo.png" /></div>
                <div><img className="trash-mail-logo filter-logo" src="assets/img/trash-mails-icon.png" /></div>
            </div>
            <div className="mail-main-content">
                <MailFilter onSetFilter={this.onSetFilter} />
                <MailList mails={mails} onRemoveMail={this.onRemoveMail} onReadMail={this.onReadMail} />
            </div>
        </section>
    }
}
