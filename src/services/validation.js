import errorHandlingService from './errorHandling';
import utils from '../utils';
import Ajv from 'ajv';

const validationService = ((errorHandling, utils) => {
  let _isEmpty, _isJsonInvalid;

  function _validate(schemas) {
    _isEmpty = false;
    _isJsonInvalid = false;

    _checkForEmpty(schemas);

    if (_areSchemasValid()) {
      _checkForJsonValidity(schemas);
    }
  }

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

        _isEmpty = true;
      }
      // else {
        // isEmpty = false;
      // }
    }
  }

  function _checkForJsonValidity(schemas) {
    // if (!Array.isArray(schema)) {
    //   _checkOneSchemaForJsonValidity(schema);
    // }

    for (var i = schemas.length - 1; i >= 0; i--) {
      try {
        JSON.parse(JSON.stringify(schemas[i]));
        // isJsonInvalid = false;
      }
      catch (e) {
        const _innerError = errorHandling.mapToBaseError(e);
        const _error = errorHandling.createError('Validation', null, _innerError );
        errorHandling.outputToConsole(_error);

        _isJsonInvalid = true;
      }
    }
  }

  function _areSchemasValid() {
    return !_isEmpty && !_isJsonInvalid;
  }

  return {
    // checkForEmpty: _checkForEmpty,
    // checkForJsonValidity: _checkForJsonValidity,
    validate: _validate,
    areSchemasValid: _areSchemasValid
  }
})(errorHandlingService, utils);

export default validationService;