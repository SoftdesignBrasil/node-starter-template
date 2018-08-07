import { config } from 'dotenv';
import nock from 'nock';
import request from 'supertest';
import app from '../src/app';

const nockUrl = nock('http://gateway.marvel.com');
const requestUrl = request(app);
config();

describe('Character route tests', () => {
  it('should return list of characters', (done) => {
    nock('http://gateway.marvel.com')
      .get('/v1/public/characters')
      .query(true)
      .reply(202, {
        status: 'Ok',
      });
    requestUrl
      .get('/api/v1/characters')
      .expect(200, {
        status: 'Ok',
      }, done);
  });
  it('should return error when GET list of characters', (done) => {
    nock('http://gateway.marvel.com')
      .get('/v1/public/characters')
      .query(true)
      .replyWithError('Mock replyWithError');
    requestUrl
      .get('/api/v1/characters')
      .expect(500, done);
  });
  it('should return one character', (done) => {
    nock('http://gateway.marvel.com')
      .get('/v1/public/characters/123')
      .query(true)
      .reply(200, {
        status: 'Ok',
      });
    requestUrl
      .get('/api/v1/characters/123')
      .expect(200, {
        status: 'Ok',
      }, done);
  });
  it('should return error in get one character', (done) => {
    nock('http://gateway.marvel.com')
      .get('/v1/public/characters/123')
      .query(true)
      .replyWithError('Mock replyWithError');
    requestUrl
      .get('/api/v1/characters/123')
      .expect(500, done);
  });
});
