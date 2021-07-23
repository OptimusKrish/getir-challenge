const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');

// Payload for testing
const mockPayload = {
  startDate: '2016-12-14',
  endDate: '2016-12-22',
  minCount: 1,
  maxCount: 200
};

chai.use(chaiHttp);

describe('Calling API via Test', function() {
  it('Fetching Records from server with valid payload', function(done) {
    chai.request('http://18.216.191.220')
      .post('/v1/getir/post')
      .set('content-type', 'application/json')
      .send(mockPayload)
      .then(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      })
      .catch(function(err) {
        done();
        throw err;
      })
  });

  it('Fetching Records from server with invalid payload', function(done) {
    mockPayload.startDate = null;
    chai.request('http://18.216.191.220')
      .post('/v1/getir/post')
      .set('content-type', 'application/json')
      .send(mockPayload)
      .then(function(err, res) {
        res.should.have.status(400);
        res.should.be.json;
        done();
      })
      .catch(function(err) {
        done();
        throw err;
      })
  });

  it('Invalid Route', function(done) {
    chai.request('http://18.216.191.220')
      .get('/v1/getir/get')
      .set('content-type', 'application/json')
      .then(function(err, res) {
        res.should.have.status(404);
        res.should.be.json;
        done();
      })
      .catch(function(err) {
        done();
        throw err;
      })
  });

  it('Fetching Records from local with valid payload', function(done) {
    chai.request(server)
      .post('/v1/getir/post')
      .set('content-type', 'application/json')
      .send(mockPayload)
      .then(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        done();
      })
      .catch(function(err) {
        done();
        throw err;
      })
  });
});