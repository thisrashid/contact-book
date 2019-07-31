import { Response, Request } from 'express';
import { only } from '../helper';
import Contact from '../models/contact.model';

export const create_contact = async (req: any, res: Response) => {
  const contact = new Contact(req.body);
  try {
    const data = await contact.save();

    res.json({ data });
  } catch(err) {
    if(err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(
        field => err.errors[field].message
      );

      res.status(400).json({ errors, data: contact });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
}

export const view_contact = async (req: Request, res: Response) => {
  try {
    const data = await Contact.findById(req.params.id);
    
    res.json({ data });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export const search_contact = async (req: Request, res: Response) => {
  console.log(req.query)
  let field = req.query.field, 
    keyword = req.query.keyword,
    page = +req.query.page || 1,
    limit = +req.query.limit || 10,
    sortby = req.query.sortby || '_id',
    sort = req.query.sort || 'desc';

  let criteria = {};
  try {
    if(['name', 'email'].indexOf(field) === -1) field = '';
    
    if(field && keyword) {
      criteria = {
        [field] : { $regex: keyword, $options: 'i' }
      }; 
    } else {
      criteria = {};
    }

    const data = await Contact.search({ criteria, sortby, sort, page, limit});

    res.json({ data });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export const update_contact = async (req: Request, res: Response) => {
  try {
    const data = await Contact.findById(req.params.id);

    Object.assign(data, only(req.body, ['name', 'email', 'address']));

    if(data) {
      data.save();
      res.json({ data });
    } else {
      res.status(400).json({message: 'Unable to save data'});
    }
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}

export const delete_contact = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const data = await Contact.deleteOne({ _id });
    
    res.status(400).json({message: 'Data deleted'});
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
}