import express from 'express';
import { create_contact, view_contact, search_contact, update_contact, delete_contact } from '../controllers/contacts.controller';

const router = express.Router();

router.route('/')
  .get(search_contact)
  .post(create_contact);

router.route('/:id')
  .get(view_contact)
  .put(update_contact)
  .delete(delete_contact)

export default router;