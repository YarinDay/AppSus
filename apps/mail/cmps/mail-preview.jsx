import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { MailCompose } from "./mail-compose.jsx"
// const { Link } = ReactRouterDOM

export class MailPreview extends React.Component {

    state = {
        isOpen: false
    }

    onIsOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    renderDate = () => {
        const { sentAt } = this.props.mail
        const DAY_IN_MILLISECOND = 1000 * 60 * 60 * 24
        const YEAR_IN_MILLISECOND = DAY_IN_MILLISECOND * 365
        const mailDateInHours = `${new Date(sentAt).getHours()}:${utilService.padNum(new Date(sentAt).getMinutes())}`
        const mailDateInDays = `${new Date(sentAt).getDate()} ${utilService.getMonthName(sentAt)} `
        const mailDateWithYear = `${new Date(sentAt).toLocaleDateString()} `
        if ((Date.now() - sentAt) < (DAY_IN_MILLISECOND)) return mailDateInHours
        if ((Date.now() - sentAt) < (YEAR_IN_MILLISECOND)) return mailDateInDays
        return mailDateWithYear
    }

    render() {
        const { mail, onReadMail, onRemoveMail, onStarMail, onEditMail, folder } = this.props
        const { isOpen } = this.state
        // const mailDateInHours = new Date(mail.sentAt).toLocaleTimeString('en-US')

        const user = mailService.loggedInUser()
        let isMailOpen = isOpen ? "mail-preview openned" : "mail-preview"
        let isMailRead = mail.isRead ? "mail-read" : ""
        return <React.Fragment>
            <div className={isMailRead}>
                <article onClick={() => { this.onIsOpen(), onReadMail(mail.id) }} className={isMailOpen}>
                    <span className="mail-fullname">{folder === 'sent' ? mail.to : mail.fullname}</span>
                    <span className="mail-subject">{mail.subject} -</span>
                    <span className="mail-body">{mail.body}</span>
                    {mail.sentAt && <span className="mail-date">
                        {this.renderDate()}
                    </span>}
                </article >
            </div>
            {(isOpen) && <div className="msg-openned">
                <div className="msg-oppened-header">
                    <span>{mail.subject}</span>
                    <img onClick={(ev) => onRemoveMail(mail.id, ev)} className="remove-mail-img" src="assets/img/delete-logo.png" />
                    <img onClick={(ev) => onStarMail(mail.id, ev)} className="star-mail-img" src={mail.isStared ? "assets/img/stared-mail-icon.png" : "assets/img/star-mail-icon.png"} />
                    {!mail.sentAt && <img onClick={(ev) => onEditMail(mail, ev, mail.id)} className="edit-new-mail" src="assets/img/edit-new-mail.png" />}
                </div>
                {folder === 'sent' ? <p>{mail.to}</p> : <p>{mail.fullname}<span className="msg-mail-address">{` <${mail.from}>`}</span></p>}
                <p className="msg-body">{mail.body}</p>

            </div>}
        </React.Fragment>
    }

}