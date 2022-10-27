import {Component} from "react";

import './app-currency.scss';

class AppCurrency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: this.props.currencies[0].name,
            value: ''
        }
    }

    onValueChange = ({target: {value, dataset: {currency}}}) => {
        this.setState({
            currency,
            value,
        });
    }

    render() {
        const {currency, value} = this.state;
        const {rate} = this.props.currencies.find(n => n.name === currency);

        return (
            <div className="app-currency">
                {this.props.currencies.map(n => (
                    <div key={n.name} className="currency__group d-flex align-items-center">
                        <input
                            type="text"
                            name="code"
                            data-currency={n.name}
                            value={currency === n.name ? value : (value / rate * n.rate).toFixed(2)}
                            className="form-control"
                            onChange={this.onValueChange}
                        />
                        <div className="currency__item">
                            <span className="currency__item-text">{n.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        )

    }
}

// const AppCurrency = (props) => {
//     const currencyData = [
//         {code: '111', label: 'USD'},
//         {code: '222', label: 'BYN'},
//         {code: '333', label: 'UAH'}
//     ];
//
//     const inputs = currencyData.map(({code, label}) => {
//         return (
//             <div className="currency__group d-flex align-items-center">
//                 <input data-currency={code} type="text" className="form-control"/>
//                 <div className="currency__item">
//                     <span className="currency__item-text">{label}</span>
//                 </div>
//             </div>
//         )
//     })
//
//     return (
//         <div className="app-currency">
//             {inputs}
//         </div>
//     )
// }


export default AppCurrency;