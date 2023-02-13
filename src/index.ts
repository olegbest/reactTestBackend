import express, { Express } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import router from './router';
import sequelize from './db';
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';
import './models';

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(process.env.STATIC_URL, express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(router);

app.use(ErrorHandlingMiddleware);

const start = async () => {
  try {
    console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
