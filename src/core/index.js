import validationService from '../services/validation';

const core = ((validation) => {
  let _schemas;
  let _schemasHashDictionary;

  function _initialize(schemas) {
    if (!Array.isArray(schemas)) {
      schemas = [schemas];
    }

    validation.checkForEmpty(schemas);
    validation.checkForJsonValidity(schemas);

    if (validation.areSchemasValid()) {
      _schemas = schemas;

      _initializeSchemasDictionary();
    }
  }

  function _initializeSchemasDictionary()
  {
    for (let schema in _schemas) {
      for (let prop in schema) {

      }
    }
  }

  function _getSchemas() {
    return _schemas;
  }

  return {
    initialize: _initialize,
    getSchemas: _getSchemas
  }
})(validationService);

export default core;