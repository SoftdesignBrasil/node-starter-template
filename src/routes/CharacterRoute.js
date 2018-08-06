import express from 'express';
import CharacterModel from '../models/CharacterModel';
import logger from '../utils/logger';

const router = express.Router();

router.get('/', (req, res) => {
  CharacterModel.getAll(req.query)
    .then((characters) => {
      res.status(200).send(characters);
    })
    .catch((e) => {
      logger.error('CharacterRoute::GET /::error: ', e);
      res.sendStatus(500);
    });
});

router.get('/:idCharacter', (req, res) => {
  CharacterModel.getOne(req.params.idCharacter)
    .then((characters) => {
      res.status(200).send(characters);
    })
    .catch((e) => {
      logger.error('CharacterRoute::GET /::error: ', e);
      res.sendStatus(500);
    });
});

export default router;
