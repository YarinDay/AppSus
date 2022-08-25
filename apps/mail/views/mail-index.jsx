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
        console.log('draftMails:', this.state.draftMails);
        // console.log(prevState);
        // console.log('this state', this.state);

    }

    loadMails() {
        mailService.query(this.state.filterBy, this.state.folder)
            .then((mails) => this.setState({ mails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
        console.log(this.state.mails);
    }

    onSetFilterByMenu = (folder) => {
        mailService.query(this.state.filterBy, folder)
            .then((mails) => this.setState({ mails }))
        this.setState({ folder })
    }

    onReadMail = (mailId) => {
        mailService.markAsRead(mailId)
        console.log(this.state.mails);
        this.loadMails()
    }

    onRemoveMail = (mailId, ev) => {
        ev.stopPropagation();
        console.log('Removed!', mailId);
        mailService.sendToTrash(mailId)
        this.loadMails()
    }

    onStarMail = (mailId, ev) => {
        ev.stopPropagation();
        console.log('Starred!', mailId);
        mailService.toggleStarMail(mailId)
        this.loadMails()
    }

    toggleNewMail = () => {
        this.setState({ newMail: !this.state.newMail })
    }

    onAddMail = (mail) => {
        if (mail.body === '') mail.body = 'No Body Msg'
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
        if (mail.body === '') mail.body = 'No Body Msg'
        if (mail.subject === '') mail.subject = 'No subject Msg'
        mailService.addDraftMail(mail)
        this.loadMails() // maybe not necessary
    }

    showUnreadMails = () => {
        const unreadMails = mailService.getUnreadMails()
        return unreadMails
    }

    render() {
        const { mails, newMail } = this.state
        return <section className="mail-index">
            <div className="menu-logos">
                <div onClick={this.toggleNewMail}><img className="write-new-mail-logo filter-logo" src="assets/img/write-new-mail.png" /></div>
                <div onClick={() => this.onSetFilterByMenu('inbox')} className="inbox-filter-container"><img className="inbox-logo filter-logo" src="assets/img/inbox.png" /><span className="unread-mails-count">{this.showUnreadMails()}</span></div>
                <div onClick={() => this.onSetFilterByMenu('stared')}><img className="star-logo filter-logo" src="assets/img/star-logo.png" /></div>
                <div onClick={() => this.onSetFilterByMenu('draft')}><img className="new-mail-logo filter-logo" src="assets/img/new-mail-logo.png" /></div>
                <div onClick={() => this.onSetFilterByMenu('trash')} ><img className="trash-mail-logo filter-logo" src="assets/img/trash-mails-icon.png" /></div>
                <div onClick={() => this.onSetFilterByMenu('sent')}><img className="sent-logo filter-logo" src="assets/img/sent-logo.png" /></div>
            </div>
            <div className="mail-main-content">
                <MailFilter onSetFilter={this.onSetFilter} />
                <MailList mails={mails} onRemoveMail={this.onRemoveMail} onStarMail={this.onStarMail} onReadMail={this.onReadMail} />
                {newMail && <MailCompose onAddMail={this.onAddMail} onAddDraftMail={this.onAddDraftMail} />}
            </div>
        </section>
    }
}
