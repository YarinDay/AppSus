export class MailSort extends React.Component {

    state = {
        sortBy: {
            title: 'ASC',
            date: 'ASC'
        }

    }

    onSortChange = ({ target }) => {
        const { sortBy } = this.state
        this.setState(({ sortBy: { ...sortBy, [target.name]: target.value } }), () => this.props.onSort(this.state.sortBy))
    }

    render() {
        const { title, date } = this.state.sortBy
        return <section className="mail-sorting">
            <div>
                Title:<select name="title" className="sortByTitle" onChange={this.onSortChange} value={title}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Decseding</option>
                </select>
            </div>
            <div>
                Date:<select name="date" className="sortByDate" onChange={this.onSortChange} value={date}>
                    <option value="ASC">Ascending</option>
                    <option value="DESC">Decseding</option>
                </select>
            </div>
        </section>
    }
}