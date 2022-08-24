import { MailList } from "../cmps/mail-list.jsx"

export class MailIndex extends React.Component {

    state = {
        mails: []
    }

    render() {
        const {mails} = this.state
        return <section className="mail-index">

            <h1>mail app</h1>

           <MailList mails={mails} />
        </section>
    }
}
