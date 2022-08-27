export class MailSort extends React.Component {

    state = {
        sortBy: {
            title: 'ASC',
            date: 'ASC'
        }

    }

    onSortChange = ({ target }) => {
        this.setState((prevValue) => ({ sortBy: {...prevValue, [target.name]: target.value }}))

        this.props.onSort(this.state.sortBy)
    }

    render() {
        const { title, date } = this.state.sortBy
        return <section className="mail-sorting">
                <div>
                    Title:<select name="titleSortBy" onChange={this.onSortChange} value={title}>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Decseding</option>
                    </select>
                </div>
                <div>
                    Date:<select name="dateSortBy" onChange={this.onSortChange} value={date}>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Decseding</option>
                    </select>
                </div>
        </section>
    }
}