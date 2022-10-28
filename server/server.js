const express = require('express'),
    fs = require('fs'),
    cors = require('cors'),
    morgan = require('morgan'),
    app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(morgan('common'));
app.use(
    cors({
        origin: '*',
        methods: 'GET, POST, OPTIONS, PUT, DELETE',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    })
);

app.get('/api/users', (req, res) => {
    const usersData = getTasksFromDB('db');

    usersData ? res.send(usersData) : res.status(404).send({error: 'Users not found'});
});

app.post('/api/user', (req, res) => {
    const usersData = getTasksFromDB('db'),
        user = req.body;

    usersData.push(user);
    setTasksToDB('db', usersData);

    res.send(user);
});

app.put('/api/user/:id', (req, res) => {
    const usersData = getTasksFromDB('db'),
        user = usersData.find(user => user.id === req.params.id),
        updatedUser = req.body;

    // Object.keys(user).forEach(el => user[el] = updatedUser[el]);
    Object.assign(user, updatedUser);

    setTasksToDB('db', usersData);

    res.status(200).json({status:'Update user'})

});

app.delete('/api/user/:id', (req, res) => {
    const usersData = getTasksFromDB('db'),
        updatedData = usersData.filter(user => user.id !== req.params.id);

    setTasksToDB('db', updatedData);

    res.sendStatus(204);
});

app.get('/api/currencies', (req, res) => {
    const currencyData = getTasksFromDB('currencies');

    currencyData ? res.send(currencyData) : res.status(404).send({error: 'Currency not found'});
});

app.post('/api/currencies', (req, res) => {
    const currencyData = getTasksFromDB('currencies'),
        user = req.body;

    currencyData.push(user);
    setTasksToDB('currencies', currencyData);

    res.send(user);
});

function getTasksFromDB(database) {
    return JSON.parse(fs.readFileSync(`${database}.json`, 'utf8'));
}

function setTasksToDB(database, data) {
    switch (database) {
        case 'db':
            fs.writeFileSync(`${database}.json`, JSON.stringify(data));
            break;
        case 'currencies':
            let json = getTasksFromDB(database);

            // let result = json.map(item => ({...item, data}));
            let result = Object.assign(json, data);

            fs.writeFileSync(`${database}.json`, JSON.stringify(result));
            break;
        default:
            break;
    }
}

app.listen(3001, () => {
    console.log('Server started');
});