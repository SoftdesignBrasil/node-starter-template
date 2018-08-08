import request from 'supertest';
import app from '../../src/app';

const requestUrl = request('http://localhost:3000');

describe('App route tests', () => {
  it('should return 203 in GET /', (done) => {
    requestUrl
      .get('/')
      .expect('Content-Type', /json/)
      .expect(203, done);
  });
  it('should logger error in app.js /', (done) => {
    app.emit('error', new Error('test-error'));
    done();
  });
});
