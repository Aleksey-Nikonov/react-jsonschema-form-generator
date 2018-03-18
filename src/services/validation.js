import errorHandlingService from './errorHandling';
import utils from '../utils';
import Ajv from 'ajv';

const validationService = ((errorHandling, utils) => {
  let isEmpty = false,
      isJsonInvalid = false;

  function _checkForEmpty(schemas) {
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
        const _error = errorHandling.createError('Empty', { schemaNumber: i } );
        errorHandling.outputToConsole(_error);

        isEmpty = true;
      } else {
        isEmpty = false;
      }
    }
  }

  function _checkForJsonValidity(schemas) {
    // if (!Array.isArray(schema)) {
    //   _checkOneSchemaForJsonValidity(schema);
    // }

    for (var i = schemas.length - 1; i >= 0; i--) {
      try {
        JSON.parse(JSON.stringify(schemas[i]));
        isJsonInvalid = false;
      }
      catch (e) {
        const _innerError = errorHandling.mapToBaseError(e);
        const _error = errorHandling.createError('Validation', null, _innerError );
        errorHandling.outputToConsole(_error);

        isJsonInvalid = true;
      }
    }
  }

  function _areSchemasValid() {
    return !isEmpty && !isJsonInvalid;
  }

  return {
    checkForEmpty: _checkForEmpty,
    checkForJsonValidity: _checkForJsonValidity,
    areSchemasValid: _areSchemasValid
  }
})(errorHandlingService, utils);

export default validationService;