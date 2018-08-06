import { ok, equal } from 'assert';
import moment from 'moment';
import UrlHelper from '../src/utils/UrlHelper';

describe('UrlHelper tests', () => {
  it('should create a auth params', () => {
    const { publicKey, hash, ts } = UrlHelper.getAuth();
    ok(publicKey.length > 30);
    ok(hash.length > 30);
    ok(moment(ts).isValid());
  });

  it('should make marvel url with params', () => {
    const url = UrlHelper.makeURL('/test', { test: 'param' });
    equal(url.startsWith('http://gateway.marvel.com/test'), true);
    equal(url.includes('test=param'), true);
  });
});
