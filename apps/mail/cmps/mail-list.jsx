import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onReadMail, onRemoveMail, onStarMail }) {

    return <section className="mail-list">

        <ul className="mail-container clear-list">
            {(!mails || !mails.length) && <div>There are no mails..</div>}
            {mails.map((mail) => <li key={mail.id}><MailPreview onRemoveMail={onRemoveMail} onStarMail={onStarMail} onReadMail={onReadMail} mail={mail} /></li>)}

        </ul>
    </section>
}