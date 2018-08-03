import { equal } from 'assert';
import httpMocks from 'node-mocks-http';
import { config } from 'dotenv';
import { EventEmitter } from 'events';
import nock from 'nock';
import characters from '../src/routes/characters';

describe('Character route tests', (suite) => {
  beforeEach('Config DotEnv', () => {
    config();
  });
  it('should return list of characters', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/',
    });
    const res = httpMocks.createResponse({ eventEmitter: EventEmitter });
    res.on('end', () => {
      const dataJSON = JSON.parse(res._getData());
      equal(dataJSON.status, 'Ok');
      done();
    });
    nock('http://gateway.marvel.com')
      .get('/v1/public/characters')
      .query(true)
      .reply(200, {
        status: 'Ok',
      });
    characters(req, res);
  });
  it('should return error in list of characters', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/',
    });
    const res = httpMocks.createResponse({ eventEmitter: EventEmitter });
    res.on('end', () => {
      equal(res._getStatusCode(), 500);
      done();
    });
    nock('http://gateway.marvel.com')
      .get('/v1/public/characters')
      .query(true)
      .replyWithError('error');
    characters(req, res);
  });
  it('should return one character', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/123',
    });
    const res = httpMocks.createResponse({ eventEmitter: EventEmitter });
    res.on('end', () => {
      const dataJSON = JSON.parse(res._getData());
      equal(dataJSON.status, 'Ok');
      done();
    });
    nock('http://gateway.marvel.com')
      .get('/v1/public/characters/123')
      .query(true)
      .reply(200, {
        status: 'Ok',
      });
    characters(req, res);
  });
  it('should return error in get one character', (done) => {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/123',
    });
    const res = httpMocks.createResponse({ eventEmitter: EventEmitter });
    res.on('end', () => {
      equal(res._getStatusCode(), 500);
      done();
    });
    nock('http://gateway.marvel.com')
      .get('/v1/public/characters/123')
      .query(true)
      .replyWithError('error');
    characters(req, res);
  });
});
