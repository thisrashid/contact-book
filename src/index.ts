import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import model from './models';
model();
import routes from './routes';

const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE || 'mongodb://192.168.99.100:27017/contacts';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', routes);

connect();

function listen() {
  app.listen(PORT, () => {
    console.log(`Contact-Book app listening on port ${PORT}!`);
  });
}

function connect() {

  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(DATABASE, { useNewUrlParser: true });
}