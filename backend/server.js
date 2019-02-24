const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// load routes
const apiRouter = require('./routes/api.route');
app.use('/api', apiRouter);

mongoose.connect('mongodb://localhost:27017');

const connection = mongoose.connection;

// app.use('/', router);

connection.once('open', () => {
    console.log('MongoDB database connected');
});

// app.get('/', middleware.checkToken, handlers.index);

app.listen(4000, () => console.log('Express server running on port 4000'));

export default app;