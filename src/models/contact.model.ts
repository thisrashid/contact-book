import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
  email: {
    type: String,
    required: 'Kindly enter valid email'
  },
  name: {
    type: String,
    required: 'Kindly enter the name'
  },
  address: {
    type: String,
    required: 'Kindly enter the address'
  }
});

export default () => mongoose.model('Contact', ContactSchema);