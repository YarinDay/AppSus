const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return <Link to={`/mail/${mail.id}`}><article className="mail-preview">
        {mail.subject}<span className="mail-body">{mail.body}</span> {mail.sentAt}
    </article >
    </Link>
}