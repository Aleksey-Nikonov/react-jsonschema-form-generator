import * as errorHandling from './errorHandling';
import * as utils from '../utils';
import Ajv from 'ajv';

let isEmpty, isJsonInvalid;

export function validate(schemas) {
  isEmpty = false;
  isJsonInvalid = false;

  checkForEmpty(schemas);

  if (areSchemasValid()) {
    checkForJsonValidity(schemas);
  }
}

function checkForEmpty(schemas) {
  // if (!Array.isArray(schema)) {
  //   if (utils.isObjectEmpty(schema)) {
  //     const _error = errorHandling.createError('Empty');
  //     errorHandling.outputToConsole(_error);

  //     isEmpty = true;
  //   } else {
  //     isEmpty = false;
  //   }
  // }

  for (var i = schemas.length - 1; i >= 0; i--) {
    if (utils.isObjectEmpty(schemas[i])) {
      const error = errorHandling.createError('Empty', { schemaNumber: i } );
      errorHandling.outputToConsole(error);

      isEmpty = true;
    }
    // else {
      // isEmpty = false;
    // }
  }
}

function checkForJsonValidity(schemas) {
  // if (!Array.isArray(schema)) {
  //   checkOneSchemaForJsonValidity(schema);
  // }

  for (var i = schemas.length - 1; i >= 0; i--) {
    try {
      JSON.parse(JSON.stringify(schemas[i]));
      // isJsonInvalid = false;
    }
    catch (e) {
      const innerError = errorHandling.mapToBaseError(e);
      const error = errorHandling.createError('Validation', null, innerError);
      errorHandling.outputToConsole(error);

      isJsonInvalid = true;
    }
  }
}

export function areSchemasValid() {
  return !isEmpty && !isJsonInvalid;
}