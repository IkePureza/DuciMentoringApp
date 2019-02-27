const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

import registerApiResponseHandlers from './util/api/apiResponseHandlers';
import sanitizeMiddleware from './util/api/sanitizeMiddleware';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(sanitizeMiddleware);


registerApiResponseHandlers(express);

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