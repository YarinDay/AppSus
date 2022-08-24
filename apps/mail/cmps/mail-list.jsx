import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onReadMail }) {
    console.log('mails from mails list', mails)

    return <section className="mail-list">

        <ul className="mail-container clear-list">
            {(!mails || !mails.length) && <div>There are no mails..</div>}
            {mails.map((mail, idx) => <li key={mail.id}><MailPreview idx={idx} onReadMail={onReadMail} mail={mail} /></li>)}

        </ul>
    </section>
}