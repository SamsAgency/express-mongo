
const genres = require('./routes/genres');
const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.use(express.json());
app.use('/api/genres', genres);

mongoose.connect('mongodb://localhost/GenresCollection', { useUnifiedTopology: true },{ useNewUrlParser: true })
    .then(() => console.log('Database is starting...'))
    .catch(err => console.error(err))


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));