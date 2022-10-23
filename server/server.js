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
    const usersData = getTasksFromDB(req);

    usersData ? res.send(usersData) : res.status(404).send({error: 'Users not found'});
});

app.post('/api/user', (req, res) => {
    const usersData = getTasksFromDB(),
        user = req.body;

    usersData.push(user);
    setTasksToDB(usersData);

    res.send(user);
});

app.put('/api/user/:id', (req, res) => {
    const usersData = getTasksFromDB(),
        user = usersData.find(user => user.id === req.params.id),
        updatedUser = req.body;

    // Object.keys(user).forEach(el => user[el] = updatedUser[el]);
    Object.assign(user, updatedUser);

    setTasksToDB(usersData);

    res.status(200).json({status:'Update user'})

});

app.delete('/api/user/:id', (req, res) => {
    const usersData = getTasksFromDB(),
        updatedData = usersData.filter(user => user.id !== req.params.id);

    setTasksToDB(updatedData);

    res.sendStatus(204);
});

function getTasksFromDB(user) {
    return JSON.parse(fs.readFileSync('db.json', 'utf8'));
}

function setTasksToDB(tasksData) {
    fs.writeFileSync('db.json', JSON.stringify(tasksData));
}

app.listen(3001, () => {
    console.log('Server started');
})
