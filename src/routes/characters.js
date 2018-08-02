import express from 'express';
import moment from 'moment';
import crypto from 'crypto';
import request from 'request';
const querystring = require('querystring');

const router = express.Router();

function getAuth() {
  const ts = moment().valueOf();
  const publicKey = process.env.MARVEL_PUBLIC_KEY
  const dataForHash = ts + process.env.MARVEL_PRIVATE_KEY + process.env.MARVEL_PUBLIC_KEY
  const hash = crypto.createHash('md5').update(dataForHash).digest('hex')
  return {publicKey, hash, ts}
}

router.get('/', function(req, res, next) {
  let {publicKey, hash, ts} = getAuth()
  
  const currentQuery = querystring.stringify(req.query)
  const context = '/v1/public/characters'
  const url = `${process.env.MARVEL_URL}${context}?ts=${ts}&apikey=${publicKey}&hash=${hash}&${currentQuery}`

  console.log(url)

  request.get(url, function callback(err, httpResponse, body) {
      if (err) {
        res.send(500, err)
      }
      res.status().send(body)
  })
});

module.exports = router;
