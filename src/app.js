import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import users from './routes/characters';

const app = express();

config();
app.use(morgan('dev'));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.contentType('application/json');
  next();
});
app.use('/api/v1/characters', users);

module.exports = app;
