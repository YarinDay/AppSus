import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

export class MailIndex extends React.Component {

    state = {
        mails: [],
        filterBy: null,
        folder: 'inbox',
        newMail: false,
        draftMails: []
    }

    componentDidMount() {
        this.loadMails()
    }

    componentDidUpdate(prevProps, prevState) {
        this.showUnreadMails()

    }

    loadMails() {
        mailService.query(this.state.filterBy, this.state.folder)
            .then((mails) => this.setState({ mails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }

    onSetFilterByMenu = (folder) => {
        mailService.query(this.state.filterBy, folder)
            .then((mails) => this.setState({ mails }))
        this.setState({ folder })
    }

    onReadMail = (mailId) => {
        mailService.markAsRead(mailId)
        this.loadMails()
    }

    onRemoveMail = (mailId, ev) => {
        ev.stopPropagation();
        mailService.sendToTrash(mailId)
        this.loadMails()
    }

    onStarMail = (mailId, ev) => {
        ev.stopPropagation();
        mailService.toggleStarMail(mailId)
        this.loadMails()
    }

    toggleNewMail = () => {
        this.setState({ newMail: !this.state.newMail })
    }

    onAddMail = (mail) => {
        if (mail.body === '') mail.body = 'No body Msg'
        if (mail.subject === '') mail.subject = 'No subject Msg'
        mailService.addNewMail(mail)
        this.loadMails()
    }

    onAddDraftMail = (mail) => {
        const { draftMails } = this.state
        // this.setState({ draftMails: draftMails.unshift(mail) })
        this.setState(prevState => ({
            draftMails: [...prevState.draftMails, mail]
        }))
        if (mail.body === '') mail.body = 'No body Msg'
        if (mail.subject === '') mail.subject = 'No subject Msg'
        mailService.addDraftMail(mail)
        this.loadMails() // maybe not necessary
    }

    showUnreadMails = () => {
        const unreadMails = mailService.getUnreadMails()
        return unreadMails
    }

    render() {
        const { mails, newMail, folder } = this.state
        return <section className="mail-index">
            <div className="menu-logos">
                <div className="filter-logo-container" onClick={this.toggleNewMail}><img className="write-new-mail-logo filter-logo" src="assets/img/write-new-mail.png" /> New mail</div>
                <div className={folder === 'inbox' ? "filter-logo-container inbox-filter-container clicked" : "filter-logo-container inbox-filter-container"} onClick={() => this.onSetFilterByMenu('inbox')}><img className="inbox-logo filter-logo" src={folder === 'inbox' ? "assets/img/inbox-clicked.png":"assets/img/inbox.png"} />Inbox<span className="unread-mails-count">{this.showUnreadMails()}</span></div>
                <div className={folder === 'stared' ? "filter-logo-container clicked" : "filter-logo-container"} onClick={() => this.onSetFilterByMenu('stared')}><img className="star-logo filter-logo" src={folder === 'stared' ? "assets/img/stared-mail-icon.png" : "assets/img/star-logo.png"} />Favorites</div>
                <div className={folder === 'draft' ? "filter-logo-container clicked" : "filter-logo-container"} onClick={() => this.onSetFilterByMenu('draft')}><img className="new-mail-logo filter-logo" src={folder === 'draft'? "assets/img/new-mail-clicked.png":"assets/img/new-mail-logo.png"} />Drafts</div>
                <div className={folder === 'trash' ? "filter-logo-container clicked" : "filter-logo-container"} onClick={() => this.onSetFilterByMenu('trash')}><img className="trash-mail-logo filter-logo" src={folder === 'trash'? "assets/img/trash-clicked.png": "assets/img/trash-mails-icon.png"}/>Trash</div>
                <div className={folder === 'sent' ? "filter-logo-container clicked" : "filter-logo-container"} onClick={() => this.onSetFilterByMenu('sent')}><img className="sent-logo filter-logo" src={folder === 'sent' ? "assets/img/sent-clicked-logo.png" : "assets/img/sent-logo.png"} />Sent mails</div>
            </div>
            <div className="mail-main-content">
                <MailFilter onSetFilter={this.onSetFilter} />
                <MailList mails={mails} onRemoveMail={this.onRemoveMail} onStarMail={this.onStarMail} onReadMail={this.onReadMail} />
                {newMail && <MailCompose onAddMail={this.onAddMail} onAddDraftMail={this.onAddDraftMail} />}
            </div>
        </section>
    }
}
