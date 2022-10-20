import './app-filter.scss';

const AppFilter = (props, onFilterChange) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники', colored: false},
        {name: 'rise', label: 'На повышение', colored: false},
        {name: 'moreThen1000', label: 'З/П больше 1000$', colored: false}
    ];

    const buttons = buttonsData.map(({name, label, colored}) => {
        const active = props.filter === name;
        const activeClass = active ? 'btn-light' : 'btn-outline-light';
        const style = colored ? {color: 'red'} : null;
        return (
            <button type="button"
                    className={`btn ${activeClass}`}
                    key={name}
                    onClick={() => props.onFilterChange(name)}
                    style={style}>
                    {label}
            </button>
        )
    })

    return (
        <div className="btn-group-panel">
            <div className="btn-group d-none d-sm-block">
                {buttons}
            </div>

            <div className="btn-group-vertical d-block d-sm-none mt-4">
                {buttons}
            </div>
        </div>
    )
}

export default AppFilter;