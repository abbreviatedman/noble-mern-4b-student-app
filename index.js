const express = require('express');
const logger = require('morgan');

const connectToMongoDB = require('./database/mongodb');
const usersRouter = require('./routers/usersRouter');

const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', usersRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
    connectToMongoDB();
});