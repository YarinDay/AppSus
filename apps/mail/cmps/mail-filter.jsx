export class MailFilter extends React.Component {

    state = {
        filterBy: {
            subject: ''
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        console.log(field);
        console.log(value);
        console.log(this.props);
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
        const { subject } = this.state.filterBy
        return <section className="mail-filter">
            <form onSubmit={this.onFilter}>
                <label htmlFor="by-subject"></label>
                <input
                    type="text"
                    placeholder="Search mail"
                    id="by-subject"
                    name="subject"
                    value={subject}
                    onChange={this.handleChange}
                />
                <button hidden>Filter!</button>
            </form>
        </section>
    }
}