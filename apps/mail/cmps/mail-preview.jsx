import { mailService } from "../services/mail.service.js"
// const { Link } = ReactRouterDOM

export class MailPreview extends React.Component {

    state = {
        isOpen: false
    }

    onIsOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { mail, onReadMail, onRemoveMail } = this.props
        const { isOpen } = this.state
        const mailDateInHours = new Date(mail.sentAt).toLocaleTimeString('en-US')
        const mailDateInDays = new Date(mail.sentAt).toLocaleDateString('en-US')
        const user = mailService.loggedInUser()
        let isMailOpen = isOpen ? "mail-preview openned" : "mail-preview"
        let isMailRead = mail.isRead ? "mail-read" : ""
        return <React.Fragment>
            <div className={isMailRead}>
                <article onClick={() => { this.onIsOpen(), onReadMail(mail.id) }} className={isMailOpen}>
                    <span className="mail-subject">{mail.subject}</span>
                    <span className="mail-body">{mail.body}</span>
                    <span className="mail-date">
                        {((Date.now() - mail.sentAt) > (1000 * 60 * 60 * 24)) ? mailDateInDays : mailDateInHours}
                    </span>
                    <img onClick={() => onRemoveMail(mail.id)} className="remove-mail-img" src="assets/img/delete-logo.png" />
                </article >
            </div>
            {isOpen && <div className="msg-openned">
                <h2>{mail.subject}</h2>
                <p>{user.fullname}<span className="msg-mail-address">{` <${user.email}>`}</span></p>
                <p className="msg-body">{mail.body}</p>
            </div>}
        </React.Fragment>
    }

}