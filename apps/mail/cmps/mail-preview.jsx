import { utilService } from "../../../services/util.service.js"
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
        const { mail, onReadMail, onRemoveMail, onStarMail } = this.props
        const { isOpen } = this.state
        // const mailDateInHours = new Date(mail.sentAt).toLocaleTimeString('en-US')
        const mailDateInHours = `${new Date(mail.sentAt).getHours()}:${utilService.padNum(new Date(mail.sentAt).getMinutes())}`
        const mailDateInDays = `${new Date(mail.sentAt).getDate()} ${utilService.getMonthName(mail.sentAt)} `
        const user = mailService.loggedInUser()
        let isMailOpen = isOpen ? "mail-preview openned" : "mail-preview"
        let isMailRead = mail.isRead ? "mail-read" : ""
        return <React.Fragment>
            <div className={isMailRead}>
                <article onClick={() => { this.onIsOpen(), onReadMail(mail.id) }} className={isMailOpen}>
                    <span className="mail-fullname">{mail.fullname}</span>
                    <span className="mail-subject">{mail.subject} -</span>
                    <span className="mail-body">{mail.body}</span>
                    {mail.sentAt && <span className="mail-date">
                        {((Date.now() - mail.sentAt) > (1000 * 60 * 60 * 24)) ? mailDateInDays : mailDateInHours}
                    </span>}

                </article >
            </div>
            {(isOpen) && <div className="msg-openned">
                <div className="msg-oppened-header">
                    <span>{mail.subject}</span>
                    <img onClick={(ev) => onRemoveMail(mail.id, ev)} className="remove-mail-img" src="assets/img/delete-logo.png" />
                    <img onClick={(ev) => onStarMail(mail.id, ev)} className="star-mail-img" src={mail.isStared ? "assets/img/stared-mail-icon.png" : "assets/img/star-mail-icon.png"} />
                </div>
                <p>{mail.fullname}<span className="msg-mail-address">{` <${mail.from}>`}</span></p>
                <p className="msg-body">{mail.body}</p>

            </div>}
        </React.Fragment>
    }

}