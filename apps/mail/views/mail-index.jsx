import { MailFilter } from "../cmps/mail-filter.jsx"
import { MailList } from "../cmps/mail-list.jsx"
import { mailService } from "../services/mail.service.js"

export class MailIndex extends React.Component {

    state = {
        mails: [],
        filterBy: null
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails() {
        mailService.query(this.state.filterBy)
            .then((mails) => this.setState({ mails }))
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, () => {
            this.loadMails()
        })
    }

    render() {
        const { mails } = this.state
        return <section className="mail-index">

            <h1>mail app</h1>
            <MailList mails={mails} />
            <MailFilter onSetFilter={this.onSetFilter} />
        </section>
    }
}
