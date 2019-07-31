import express from 'express';
import { create_contact, view_contact, search_contact, update_contact, delete_contact } from '../controllers/contacts.controller';
import { basicAuth } from '../middlewares';

const router = express.Router();

router.route('/')
  .get(search_contact)
  .post(basicAuth, create_contact);

router.route('/:id')
  .get(view_contact)
  .put(basicAuth, update_contact)
  .delete(basicAuth, delete_contact)

export default router;