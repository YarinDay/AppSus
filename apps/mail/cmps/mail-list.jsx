import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails }) {
    console.log('mails from mails list', mails)

    return <section className="mail-list">
        <div className="menu-logos">
            <img className="grid-menu-logo" src="assets/img/grid-menu.png" />
            <img className="inbox-logo" src="assets/img/inbox.png" />
            <img className="star-logo" src="assets/img/star-logo.png" />
            <img className="new-mail-logo" src="assets/img/new-mail-logo.png" />
            <img className="sent-logo" src="assets/img/sent-logo.png" />
        </div>
        <ul className="mail-container clear-list">
            {(!mails || !mails.length) && <div>There are no mails..</div>}
            {mails.map(mail => <li key={mail.id}><MailPreview mail={mail} /></li>)}

        </ul>
    </section>
}