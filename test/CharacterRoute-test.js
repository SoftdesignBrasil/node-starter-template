import { config } from 'dotenv';
import nock from 'nock';
import request from 'supertest';
import app from '../src/app';

const nockUrl = nock('http://gateway.marvel.com');
config();

describe('Character route tests', () => {
  it('should return list of characters', (done) => {
    nockUrl
      .get('/v1/public/characters')
      .query(true)
      .reply(200, {
        status: 'Ok',
      });
    request(app)
      .get('/api/v1/characters')
      .expect(200, {
        status: 'Ok',
      }, done);
  });
  it('should return error when GET list of characters', (done) => {
    nockUrl
      .get('/v1/public/characters')
      .query(true)
      .replyWithError('error');
    request(app)
      .get('/api/v1/characters')
      .expect(500, done);
  });
  it('should return one character', (done) => {
    nockUrl
      .get('/v1/public/characters/123')
      .query(true)
      .reply(200, {
        status: 'Ok',
      });
    request(app)
      .get('/api/v1/characters/123')
      .expect(200, {
        status: 'Ok',
      }, done);
  });
  it('should return error in get one character', (done) => {
    nockUrl
      .get('/v1/public/characters/123')
      .query(true)
      .replyWithError('error');
    request(app)
      .get('/api/v1/characters/123')
      .expect(500, done);
  });
});
