import express from 'express';
import moment from 'moment';
import crypto from 'crypto';
import request from 'request';
import { stringify } from 'querystring';

const router = express.Router();

function getAuth() {
  const ts = moment().valueOf();
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const dataForHash = ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY;
  const hash = crypto.createHash('md5').update(dataForHash).digest('hex');
  return { publicKey, hash, ts };
}

router.get('/', (req, res) => {
  const { publicKey, hash, ts } = getAuth();
  let currentQuery = stringify(req.query);
  if (currentQuery) {
    currentQuery = `&${currentQuery}`;
  }
  const context = '/v1/public/characters';
  const url = `${process.env.MARVEL_URL}${context}?ts=${ts}&apikey=${publicKey}&hash=${hash}${currentQuery}`;
  request.get(url, (err, httpResponse, body) => {
    if (err) {
      res.send(500);
    } else {
      res.status(httpResponse.statusCode).send(body);
    }
  });
});

router.get('/:idCharacter', (req, res) => {
  const { publicKey, hash, ts } = getAuth();

  const context = `/v1/public/characters/${req.params.idCharacter}`;
  const url = `${process.env.MARVEL_URL}${context}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  request.get(url, (err, httpResponse, body) => {
    if (err) {
      res.send(500);
    } else {
      res.status(httpResponse.statusCode).send(body);
    }
  });
});

export default router;
