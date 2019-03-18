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
        res.status(500).json({message: 'the users information could not be retrieved'})
    })
})  


// Get Users By ID - Return specific user in db 

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db
    .findById(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        req.status(404).json({message: 'user with the specified id does not exist'})
    })
})

// Delete User By ID - Delete a specific user in db

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db
    .remove(id)
    .then(deleted => {
        if (deleted){
            res.status(204).end();
        } else {
            res.status(404).json({message: 'the user with the specified id could not be found'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'the user could not be removed'})
    })
})


// Post User = Add a user to the db

server.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name && newUser.bio){
        db
        .insert(newUser)
        then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({message: 'there was an error while saving user'})
        })
    } else {
        res.status(400).json({message: 'please provide a name and bio for this user'})

    }
})

// Put User = Update a user in the db 

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    if(updates.name || updates.bio){
        db
        .update(id, updates)
        .then(updated => {
            if(updated){
                res.status(200).json(updated)
            } else {
                res.status(404).json({message: 'the user with the specified id does not exist'})
            } 
        })
        .catch(err => {
            res.status(500).json({message: 'the user could not be removed'})
        })           
    } else {
        res.status(400).json({message: 'please provide a name and bio for this user'})
    }
})


// res.status(200).json(updates)
//             } else {
//                 res.status(404).json({message: 'the user with the specified id does not exist'})
//             }
//         .catch(err => {
            
//         })