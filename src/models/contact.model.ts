import { Schema, Document, model, Model } from 'mongoose';

export interface IContact extends Document{
  name: string;
  email: string;
  address: string;
}

export interface IContactModel extends Model<IContact> {
  search(options: any);
}

const ContactSchema: Schema = new Schema({
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

ContactSchema.statics.search = function({criteria, sortby, sort, page, limit}) {
  return this.find(criteria).sort({[sortby]: sort === 'asc' ? 1 : -1}).skip((page - 1) * limit).limit(limit)
};

export default model<IContact, IContactModel>('Contact', ContactSchema);