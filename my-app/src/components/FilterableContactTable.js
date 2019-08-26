/**
import React, {Component} from 'react';
import './List.css';


var contacts = [
    {name: 'Tom Jackson', phone: '555-444-333', email: 'tom@gmail.com'},
    {name: 'Mike James', phone: '555-777-888', email: 'mikejames@gmail.com'},
    {name: 'Janet Larson', phone: '555-222-111', email: 'janetlarson@gmail.com'},
    {name: 'Clark Thompson', phone: '555-444-333', email: 'clark123@gmail.com'},
    {name: 'Emma Page', phone: '555-444-333', email: 'emma1page@gmail.com'},

];
const ContactRow = React.forwardRef((props, ref) => (
    <tr ref={ref}>
        <td>{props.contact.name}</td>
        <td>{props.contact.phone}</td>
        <td>{props.contact.email}</td>
    </tr>
));


class ContactTable extends React.Component {
    componentDidMount() {
        this['rowRef-1'].style.background = 'gold';
    }

    render() {
        var rows = [];
        this.props.contacts.forEach((contact, index) => {
            if (contact.name.indexOf(this.props.filterText) === -1) {
                return;
            }
            rows.push(
                <ContactRow
                    ref={(r) => this[`rowRef-${index}`] = r}
                    contact={contact}
                />
            );
        });
        return (
            <table className='table'>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    render() {
        return (
            <form>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
            </form>
        );
    }
}

class FilterableContactTable extends React.Component {
    constructor(props) {
        super(props);
        // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
        this.state = {
            filterText: ''
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);

    }

    handleFilterTextInput(filterText) {
        //Call to setState to update the UI
        this.setState({
            filterText: filterText
        });
        //React knows the state has changed, and calls render() method again to learn what should be on the screen
    }

    render() {
        return (
            <div>
                <h1>Filterable React List</h1>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextInput={this.handleFilterTextInput}
                />
                <ContactTable
                    contacts={this.props.contacts}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}
export default FilterableContactTable;

 **/