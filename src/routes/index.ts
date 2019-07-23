import express from 'express';
import contactRouter from './contact.route';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('This is contact-book API');
})

router.use('/contacts', contactRouter);

export default router;