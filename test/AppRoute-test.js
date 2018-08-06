import request from 'supertest';
import app from '../src/app';

describe('App route tests', () => {
  it('should return 201 in GET /', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
});
