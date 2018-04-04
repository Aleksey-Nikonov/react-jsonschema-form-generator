import * as validation from '../services/validation';
import * as utils from '../utils';
import * as hashDictionary from './hashDictionary';

let schemas;
let schemasHashDictionary;

export function initialize(schemas) {
  return new Promise((resolve, reject) => {
    if (utils.isObject(schemas)) {
      schemas = [schemas];
    }

    validation.validate(schemas);

    if (validation.areSchemasValid()) {
      schemas = schemas;

      hashDictionary.initialize(schemas)
        .then(hash => {
          schemasHashDictionary = hash;
          console.log(utils.getTimeStamp(), schemasHashDictionary);
          resolve();
        });
    }
  });
}

export function getHashDictionary() {
  return schemasHashDictionary;
}