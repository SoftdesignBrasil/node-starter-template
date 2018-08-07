import rp from 'request-promise';
import UrlHelper from '../utils/UrlHelper';
import logger from '../utils/logger';

export default class CharacterModel {
  static getAll(query) {
    return rp(UrlHelper.makeURL('/v1/public/characters', query))
      .catch((e) => {
        logger.error('CharacterModel::getAll::error: ', e);
        throw e;
      });
  }

  static getOne(characterId) {
    return rp(UrlHelper.makeURL(`/v1/public/characters/${characterId}`))
      .catch((e) => {
        logger.error('CharacterModel::getOne::error: ', e);
        throw e;
      });
  }
}
