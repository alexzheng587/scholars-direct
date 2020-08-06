import express from 'express';
import session from 'express-session';
import { uuid } from 'uuidv4';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import cors from 'cors';
import models from './models';
const getUserStatus = require('./io/get-user-status').default;
const getUserSocketId = require('./io/get-user-socketid').default;

const cookieParser = require('cookie-parser');

// globals
global.models = models;

const app = express();

app.enable('trust proxy');

// Dev middleware

app.use(morgan('dev'));

// App middleware

app.use(cookieParser("bad_secret"));
app.use(cors({ credentials: true }));

app.use(session({
    genid: (req) => uuid(),
    secret: "BadSecret",
    resave: false,
    saveUninitialized: true,
    // use secure cookies for production meaning they will only be sent via https
    //cookie: { secure: true }
}));

app.use(bodyParser.urlencoded({ extended: false, limit: '2mb' }));
app.use(bodyParser.json({ limit: '5mb' }));

app.get('/user/:userid/status', getUserStatus);
app.get('/user/:userid/socket-id', getUserSocketId);

app.use(compression());
app.use(express.static(path.join('.', 'public')));

// Views
app.set('view engine', 'pug');
app.set('views', path.join('.', '/views/'));

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

export default app;