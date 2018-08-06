import rp from 'request-promise';
import UrlHelper from '../utils/UrlHelper';
import logger from '../utils/logger';

export default class CharacterModel {
  static getAll(query) {
    return new Promise((resolve, reject) => {
      rp(UrlHelper.makeURL('/v1/public/characters', query))
        .then((body) => {
          resolve(body);
        })
        .catch((e) => {
          logger.error('CharacterModel::getAll::error: ', e);
          reject();
        });
    });
  }

  static getOne(characterId) {
    return new Promise((resolve, reject) => {
      rp(UrlHelper.makeURL(`/v1/public/characters/${characterId}`))
        .then((body) => {
          resolve(body);
        })
        .catch((e) => {
          logger.error('CharacterModel::getOne::error: ', e);
          reject();
        });
    });
  }
}
