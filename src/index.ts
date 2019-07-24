import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configureRoutes } from './routes';
import connectToDb from './db';

const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE || 'mongodb://192.168.99.100:27017/contacts';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function listen() {
  configureRoutes(app);

  app.listen(PORT, () => {
    console.log(`Contact-Book app listening on port ${PORT}!`);
  });
}

connectToDb(DATABASE, app, listen);