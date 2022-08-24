import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export class MailPreview extends React.Component {
    state = {
        isOpen: false
    }

    onIsOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { mail, onReadMail, idx } = this.props
        const { isOpen } = this.state
        const mailDateInHours = new Date(mail.sentAt).toLocaleTimeString('en-US')
        const mailDateInDays = new Date(mail.sentAt).toLocaleDateString('en-US')
        const user = mailService.loggedInUser()
        return <React.Fragment>
            <article onClick={() => { this.onIsOpen(), onReadMail(mail, idx) }} className={(isOpen ? "mail-preview openned" : "mail-preview") || (mail.isRead ? "mail-preview mail-read" : "mail-preview")}>
                {mail.subject}<span className="mail-body">{mail.body}</span> {((Date.now() - mail.sentAt) > (1000 * 60 * 60 * 24)) ? mailDateInDays : mailDateInHours}
            </article >
            {isOpen && <div className="msg-openned">
                <h2>{mail.subject}</h2>
                <p>{user.fullname}<span className="msg-mail-address">{` <${user.email}>`}</span></p>
                <p className="msg-body">{mail.body}</p>
            </div>}
        </React.Fragment>
    }

}