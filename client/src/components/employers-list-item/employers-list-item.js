import './employers-list-item.scss';

const EmployersListItem = (props) => {
    const {name, salary, onDelete, onToggleProp, onChangeSalary, increase, rise, currency} = props;

    let classNames = 'list-group-item d-flex flex-column flex-sm-row align-items-center justify-content-between';
    if (increase) {
        classNames += ' increase';
    }

    if (rise) {
        classNames += ' like';
    }

    const inputEnterKeyboard = (e) => {
        if (e.keyCode === 13) {
            e.target.blur();
        }
    }

    return (
        <li className={classNames}>
            <span className="list-group-item-label">{name}</span>
            <input
                className="list-group-item-input"
                type="text"
                data-name="salary"
                defaultValue={`${salary}`}
                onKeyDown={inputEnterKeyboard}
                onBlur={onChangeSalary}/>
            <div className="d-flex justify-content-center align-items-center">
            <select
                className="list-group-item-currency"
                defaultValue={currency}
                data-name="currency"
                onChange={onChangeSalary}
                >
                <option value="$">$</option>
                <option value="EUR">EUR</option>
                <option value="BYN">BYN</option>
                <option value="UAH">UAH</option>
            </select>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <button
                    type="button"
                    className="btn-cookie btn-sm "
                    data-toggle="increase"
                    onClick={onToggleProp}>
                    <i className="fas fa-cookie"></i>
                </button>

                <button
                    type="button"
                    className="btn-trash btn-sm "
                    onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>

                <button
                    type="button"
                    className="btn-star btn-sm "
                    data-toggle="rise"
                    onClick={onToggleProp}>
                    <i className="fas fa-star"></i>
                </button>


            </div>
        </li>
    )
}

export default EmployersListItem;
