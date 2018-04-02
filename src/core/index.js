import * as validation from '../services/validation';
import * as utils from '../utils';
import * as hashDictionary from './hashDictionary';

let schemas;
let schemasHashDictionary;

export function initialize(schemas) {
  if (utils.isObject(schemas)) {
    schemas = [schemas];
  }

  validation.validate(schemas);

  if (validation.areSchemasValid()) {
    schemas = schemas;

    schemasHashDictionary = hashDictionary.initialize(schemas);

    console.log(utils.getTimeStamp(), schemasHashDictionary);
  }
}