
const { Link } = ReactRouterDOM

export class MailPreview extends React.Component {
    state = {
        isOpen: false
    }

    onIsOpen = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { mail } = this.props
        const { isOpen } = this.state
        return <React.Fragment>
            <article onClick={this.onIsOpen} className="mail-preview">
                {mail.subject}<span className="mail-body">{mail.body}</span> {mail.sentAt}
            </article >
            {isOpen && <div>asdasd</div>}
        </React.Fragment>
    }

}