import './app-info.scss';

const AppInfo = ({increased, employees}) => {

    return (
        <div className="app-info">
            <h1>Учёт сотрудников  в компании Nomad</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Приемию получат: {increased}</h2>
        </div>
    )

}

export default AppInfo;