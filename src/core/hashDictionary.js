import * as validation from '../services/validation';
import * as utils from '../utils';

let schemasHashDictionary;
let asyncRequests;

export function initialize(schemas) {
  return new Promise((resolve, reject) => {
    schemasHashDictionary = {};
    asyncRequests = [];

    schemas.forEach(schema => {
      recursion(null, schema, schema);
    });

    Promise.all(asyncRequests)
      .then(() => {
        resolve(schemasHashDictionary);
      });
  });
}

function recursion(property, value, currentSchema) {
  if (utils.isArray(value)) {
    value.forEach((value) => {
      recursion(property, value, currentSchema);
    });
  }
  else if (utils.isObject(value)) {
    for (let objProperty in value) {
      if (value.hasOwnProperty(objProperty)) {
        recursion(objProperty, value[objProperty], currentSchema);
      }
    }
  }
  else {
    return resolveRef(property, value, currentSchema);
  }
}

function resolveRef(property, value, currentSchema) {
  if (property === '$id') {

    schemasHashDictionary[value] = currentSchema;

  } else if (property === '$ref') {

    if (value.startsWith('#') && value.length > 1) {

      if (!schemasHashDictionary.hasOwnProperty(value)) {

        let searchedProperty = value.match(/\w+/ig);
        let result = currentSchema[searchedProperty.shift()];

        while (searchedProperty.length !== 0) {
          result = result[searchedProperty.shift()];
        }

        schemasHashDictionary[value] = result;
      }

    } else if (value.startsWith('/')) {

      if (!schemasHashDictionary.hasOwnProperty(value)) {
        schemasHashDictionary[value] = null;
      }

    } else if (utils.isHref(value)) {
      const hrefRequest = utils.getHrefSchema(value)
        .then(schema => {
          validation.validate([schema]);

          if (validation.areSchemasValid()) {
            schemasHashDictionary[value] = schema;

            recursion(null, schema, schema);
          }
        })
        .catch(e => console.log('Error', e));

      asyncRequests.push(hrefRequest);
    }
  }
}