const Chai  = require('chai');
const expect = Chai.expect;
const Model  = require('../models/fetch');

describe('Models', function () {

  it('getCollections', function (done) {
    expect(typeof Model.getCollection(process.env.DB_COLLECTION)).to.be.deep.eq('object');
    done();
  });

  it('fetchRecords with valid keys', function (done) {
    const mockPayload = {
      startDate: '2016-12-14',
      endDate: '2016-12-22',
      minCount: 1,
      maxCount: 200
    };
    Model.fetchRecords(mockPayload)
    .then((data) => {
      expect(data).to.be.an('array');
      expect(data[0]).to.have.property('key').to.be.eq('fhTBZosc');
      done();
    });
  });

  it('fetchRecords with an invalid key', function (done) {
    const mockPayload = {
      startDate: '2016-12-14',
      endDate: '2016-12-22',
      minCount: '',
      maxCount: 200
    };
    Model.fetchRecords(mockPayload)
    .then((data) => {
      expect(data).to.be.an('array').to.deep.equal([]);
      done();
    });
  });
});