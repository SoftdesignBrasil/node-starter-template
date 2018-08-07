import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import http from 'http';
import characters from './routes/CharacterRoute';
import logger from './utils/logger';

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
  res.status(203).json({});
});
app.use('/api/v1/characters', characters);

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('error', (error) => {
  logger.error(`Critital error ${error} \n `);
});
server.on('listening', () => {
  const addr = server.address();
  logger.debug(`Listening on ${addr.port}`);
});

export default server;
