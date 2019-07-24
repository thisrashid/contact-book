import { expect } from 'chai';
import { search_contact } from './contacts.controller';
import { Request } from 'express';
import contactModel from '../models/contact.model';

let req = {
  body: {},
  param: field => {
    const params = {
      field: 'name',
      keyword: 'rashid'
    }

    return params[field];
  }
};

let res = {
  dataFromJson: '',
  statusCode: 200,
  json: function (arg) {
    this.dataFromJson = arg;
    return this;
  },
  status(code) {
    this.statusCode = code;
    return this;
  }
};

const mockDB = function (obj = {}) {
  const find = obj['find'],
    skip = obj['skip'],
    limit = obj['limit'],
    sort = obj['sort'];
  const orig = { find, skip, limit, sort };

  return {
    mock(expectedResult) {
      const stub = {
        find() { return this; },
        limit() { return Promise.resolve(expectedResult) },
        sort() { return this; },
        skip() { return this; },
        yields(data) {
          return data;
        },
        search() { return Promise.resolve(expectedResult) }
      };
    
      ['find', 'limit', 'sort', 'skip', 'yields'].map(func => obj[func] = stub[func]);
    },
    restore() {
      ['find', 'limit', 'sort', 'skip', 'yields'].map(func => obj[func] = orig[func]);
    }
  }
}

describe('Contacts Route', function () {
  describe('search_contact function', function () {
    let stub;
    beforeEach(function () {
      stub = mockDB(contactModel);
    });

    it('Should search contacts from the list if field and keyword provided ', function () {
      stub.mock({a: 1});
      search_contact(req as Request, res as any);
      expect(res.statusCode).equal(200);
    });

    it('Should search contacts from the list if no input provided ', function () {
      stub.mock({a: 1});
      req = {
        body: {},
        param: field => {}
      };
      search_contact(req as Request, res as any);
      expect(res.statusCode).equal(200);
    });

    afterEach(function () {
      stub.restore();
    });
  });
});