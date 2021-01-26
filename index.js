const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

app.get('/', (req, res) => {
    res.send('Welcome to the auth system');
})

app.get('/api/user/profile', verifyToken, (req, res) => {
    res.send({success: true, data: req.user})
})

app.use('/api/users', authRoutes);

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.itjwz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(process.env.PORT, () => console.log('Server is running'));
    })
    .catch(err => console.log(err))
