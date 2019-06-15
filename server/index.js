import express from 'express';
import conf from 'dotenv';
import winston from 'winston';
import expressValidator from 'express-validator';
import '@babel/polyfill';
import endpoints from './routes/index';

conf.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressValidator());
app.use('/', endpoints);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => { winston.info(`app running on ${port}...`); });
export default server;
