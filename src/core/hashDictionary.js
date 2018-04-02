import * as validation from '../services/validation';
import * as utils from '../utils';

let schemasHashDictionary;

export function initialize(schemas) {
  schemasHashDictionary = {};

  schemas.forEach(schema => {
    recursion(null, schema, resolveRef, schema);
  });

  return schemasHashDictionary;
}

function recursion(property, value, clb, currentSchema) {
  if (utils.isArray(value)) {
    value.forEach((value) => {
      recursion(property, value, clb, currentSchema);
    });
  }
  else if (utils.isObject(value)) {
    for (let objProperty in value) {
      if (value.hasOwnProperty(objProperty)) {
        recursion(objProperty, value[objProperty], clb, currentSchema);
      }
    }
  }
  else {
    // console.log('property ' + property, 'value ' + value)
    return clb(property, value, currentSchema);
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
      try {
        const schema = utils.getHrefSchema(value);

        validation.validate([schema]);

        if (validation.areSchemasValid()) {
          schemasHashDictionary[value] = schema;

          recursion(null, schema, resolveRef, schema);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
}