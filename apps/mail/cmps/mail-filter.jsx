export class MailFilter extends React.Component {

    state = {
        filterBy: {
            subject: '',
            readMails: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState((prevState) => ({
            filterBy: {
                ...prevState.filterBy,
                [field]: value
            }
        }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { subject, readMails } = this.state.filterBy
        return <section className="mail-filter">
            <form onSubmit={this.onFilter}>
                <input
                    type="text"
                    placeholder="Search mail"
                    id="by-subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <select id="read-mails" name="readMails" onChange={this.handleChange}>
                    <option value="">Select All</option>
                    <option value="read">Read</option>
                    <option value="unread">Unread</option>
                </select>
                <button hidden>Filter!</button>
            </form>
        </section>
    }
}