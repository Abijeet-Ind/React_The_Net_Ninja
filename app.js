const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

// ROUTES
const destinationRouter = require('./route/destinationRoute');
const userRouter = require('./route/userRouter');
const viewRouter = require('./route/viewRouter');

app.set('views engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.json());
app.use(cookieParser());

// app.use('/api/v1/destination', destinationRouter);
app.use('/', viewRouter);
app.use('/api/v1/destination', destinationRouter);
app.use('/api/v1/user', userRouter);

// app.all('*', (err) => {
//     console.log('ERROR FOUND 🔥🔥', err.statusMessage);
// })

module.exports = app;