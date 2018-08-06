import { stringify } from 'querystring';
import moment from 'moment';
import crypto from 'crypto';

export default class UrlHelper {
  static getAuth() {
    const ts = moment().valueOf();
    const publicKey = process.env.MARVEL_PUBLIC_KEY;
    const dataForHash = ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY;
    const hash = crypto.createHash('md5').update(dataForHash).digest('hex');
    return { publicKey, hash, ts };
  }

  static makeURL(context, query) {
    const { publicKey, hash, ts } = UrlHelper.getAuth();
    let currentQuery = stringify(query);
    if (currentQuery) {
      currentQuery = `&${currentQuery}`;
    }
    return `${process.env.MARVEL_URL}${context}?ts=${ts}&apikey=${publicKey}&hash=${hash}${currentQuery}`;
  }
}
