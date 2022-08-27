import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onReadMail, onEditMail, onRemoveMail, onStarMail, newMail, folder }) {

    return <section className="mail-list">

        <ul className="mail-container clear-list">
            {(!mails || !mails.length) && <div>There are no mails..</div>}
            {mails.map((mail) => <li key={mail.id}><MailPreview folder={folder} onEditMail={onEditMail} onRemoveMail={onRemoveMail} onStarMail={onStarMail} onReadMail={onReadMail} mail={mail} newMail={newMail} /></li>)}

        </ul>
    </section>
}