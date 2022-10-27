import { Component } from "react";
import { v4 as uuidv4 } from 'uuid';

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";
import AppCurrency from "../app-currency/app-currency";

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            term: '',
            filter: 'all',
            currencies: [
                {name: 'RUB', rate: 1 },
                {name: 'USD', rate: 0.013433637829124127 },
                {name: 'EUR', rate: 0.011065619121389841 },
                {name: 'UAH', rate: 0.0123123123 }
            ]
        }
    }


    componentDidMount() {
        this.getItems();
        this.getCurrencies();
    }

    getCurrencies = () => {
        const url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0';

        fetch(url)
            .then(res => res.json())
            .then(curr => {
                let currencies = curr.map(item => {
                    return {'name': item['Cur_Abbreviation'], 'rate': item['Cur_OfficialRate']}
                });
                console.log(currencies);
                this.setState ({ currencies });
            })
            .catch(error => console.log('error', error));
    }

    updateCurrencies = (currencies) => {
        fetch(`http://${window.location.hostname}:3001/api/currencies`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currencies)
        })
        .then(res => res.json())
        .catch(error => console.log('error', error));
    }

    getItems = () => {
        const url = `http://${window.location.hostname}:3001/api/users`;

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ data }))
            .catch(error => console.log('error', error));
    }

    updateItem = (user) => {
        fetch(`http://${window.location.hostname}:3001/api/user/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .catch(error => console.log('error', error));
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            currency: '',
            id: uuidv4()
        }

        fetch(`http://${window.location.hostname}:3001/api/user`,{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem),
        })
        .then(res => res.json())
        .then(() => this.setState(({ data }) => {
            const newArr = [...data, newItem];

            return {
                data: newArr
            }
        }))
    }

    deleteItem = (id) => {

        fetch(`http://${window.location.hostname}:3001/api/user/${id}`, {
            method: 'DELETE',
        })
        .then(() => this.setState(({ data }) => {
            const newArr = data.filter(elem => elem.id !== id);

            return {
                data: newArr
            }
        }));

    }

    onToggleProp = (id, prop) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                    this.updateItem({...item, [prop]: !item[prop]});
                    return {...item, [prop]: !item[prop]}
                }

                return item;
            })
        }))
    }

    onChangeSalary = (id, prop, value) => {
        this.setState(({ data }) => ({
            data: data.map(item => {
                if (item.id === id) {
                      this.updateItem({...item, [prop]: value});
                      return {...item, [prop]: value}
                }

                return item;
            })
        }))
    }

    searchEmployers = (items, term) => {
        if (!term.length) return items;

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case  'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const currencies = this.state.currencies;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmployers(data, term), filter);

        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased}
                />

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <EmployersList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onChangeSalary={this.onChangeSalary}
                    onToggleProp={this.onToggleProp}
                />
                <EmployersAddForm onAdd={this.addItem} />
                <AppCurrency currencies={currencies}/>
            </div>
        );
    }
}

export default App;
