// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.listen(5000, () => {
    console.log('\n** API up and running on port 5K')
});

server.get('/', (req, res) => {
    res.send('Hello, Jamie')
});


// Get - Return all users in db 

server.get('/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message: 'The users information could not be retrieved.'})
    })
})  


