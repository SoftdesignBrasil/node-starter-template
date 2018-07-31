const express = require('express');
const moment =  require('moment');
const crypto =  require('crypto');
import request from 'request';
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
  request.get(`${process.env.MARVEL_URL}/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`, function callback(err, httpResponse, body) {
      if (err) {
        res.send(500, err)
      }
      res.send(body)
  })
});

module.exports = router;
