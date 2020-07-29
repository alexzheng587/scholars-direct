import express from 'express';
import session from 'express-session';
import { uuid } from 'uuidv4';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import cors from 'cors';
import models from './models';

const cookieParser = require('cookie-parser');

// globals
global.models = models;

const app = express();

app.enable('trust proxy');

// Dev middleware

app.use(morgan('dev'));

// App middleware

app.use(cookieParser("BadSecret"));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

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

app.use(compression());
app.use(express.static(path.join('.', '/public')));

// Views
app.set('view engine', 'pug');
app.set('views', path.join('.', '/views/'));


export default app;