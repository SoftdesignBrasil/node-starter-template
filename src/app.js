import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import characters from './routes/CharacterRoute';

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
app.get('/', (req, res) => {
  res.status(201).send();
});
app.use('/api/v1/characters', characters);

module.exports = app;
