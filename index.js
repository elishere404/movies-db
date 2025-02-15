require('dotenv').config();
const express = require('express');
const mongo = require('mongoose')
const app = express()
const moviesRoute = require('./routes/movies.js')
const cors = require('cors')

app.use(express.json());

app.use(cors());


mongo.connect(process.env.URL);
const db = mongo.connection
db.on('error', (error) => {console.error(error)})
db.once('open', () => console.log('connected to mongodb'))

app.get('/', (req,res) => {
    res.send('movies DB')
})

app.use('/movies', moviesRoute)

app.listen(3000, () => {
    console.log('running on http://localhost:3000')
})