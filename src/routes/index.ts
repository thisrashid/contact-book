import express from 'express';
import contactRouter from './contact.route';
import { MONGO_CONNECTED } from '../config';

const router = express.Router();

// export default router;

export const configureRoutes = (app: express.Application) => {

  router.get('/', (req, res) => {
    if(app.get(MONGO_CONNECTED)) {
      res.send('This is contact-book API');
    } else {
      res.send('Unable to connect to database. The app may not function properly');
    }
  })
  
  if(app.get(MONGO_CONNECTED)) {
    router.use('/contacts', contactRouter);  
  }
  
  app.use('/', router);
}