import { MailCompose } from "../cmps/mail-compose.jsx"
import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

export class MailIndex extends React.Component {

    state = {
        mails: [],
        filterBy: null,
        folder: 'inbox',
        newMail: false
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

    onAddMail = (mail, ev) => {
        ev.preventDefault()
        console.log(mail);
        mailService.addNewMail(mail)
        this.loadMails()
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
                {newMail && <MailCompose onAddMail={this.onAddMail} />}
            </div>
        </section>
    }
}
