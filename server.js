const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({
    path: './config.env'
})
const mongoose = require('mongoose');

var db = process.env.DBID.replace('<password>', process.env.DBPSW);
mongoose.connect(db, {
    // useCreateIndex: true, //make this true
    autoIndex: true,
}).then(() => {
    console.log('DATA BASE CONNECTED');
}).catch((err) => {
    console.log('ERR 🔥🔥🔥', err);
})

const port = 80;

const server = app.listen(port, () => {
    console.log('BACKEND IS RUNNING');
})