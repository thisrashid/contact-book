import { expect } from 'chai';
import Contact from './contact.model';

describe('Contact model', function () {
  it('should be invalid if name is empty', function (done) {
    var m = new Contact();

    m.validate(function (err) {
      expect(err.errors.name).to.exist;
      done();
    });
  });

  it('should be invalid if email is empty', function (done) {
    var m = new Contact();

    m.validate(function (err) {
      expect(err.errors.email).to.exist;
      done();
    });
  });

  it('should be invalid if address is empty', function (done) {
    var m = new Contact();

    m.validate(function (err) {
      expect(err.errors.address).to.exist;
      done();
    });
  });
});