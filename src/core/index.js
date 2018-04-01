import validationService from '../services/validation';
import utils from '../utils';

const core = ((validation, utils) => {
  let _schemas;
  let _schemasHashDictionary;

  // Initialization
  // ======================================================
  function _initialize(schemas) {
    if (utils.isObject(schemas)) {
      schemas = [schemas];
    }

    validation.validate(schemas);

    if (validation.areSchemasValid()) {
      _schemas = schemas;

      _initializeSchemasDictionary();
    }
  }

  // Recursion
  // ======================================================
  // stack
  // let _currentSchema = [];
  function _initializeSchemasDictionary()
  {
    _schemasHashDictionary = {};

    _schemas.forEach(schema => {

      // _currentSchema.push(schema);
      _recursion(null, schema, _resolveRef, schema);
      // _currentSchema.pop();
    });

    console.log('result', _schemasHashDictionary);
  }

  // property - $id or $ref
  // value - value of the property
  function _resolveRef(property, value, currentSchema) {
    if (property === '$id') {

      // _schemasHashDictionary[value] = _currentSchema[_currentSchema.length - 1];
      _schemasHashDictionary[value] = currentSchema;

    } else if (property === '$ref') {

      // if (value.startsWith('#/')) {
      //   let _searchedProperty = value.substring(2, value.length).split('/');

      //   if (!_schemasHashDictionary.hasOwnProperty(value) && _searchedProperty.length !== 0) {
      //     console.log('VAL', value)
      //     let _result = _currentSchema[_searchedProperty.shift()];
      //     while (_searchedProperty.length !== 0) {
      //       _result = _result[_searchedProperty.shift()];
      //     }

      //     // console.log('RESULT', _result);

      //     _schemasHashDictionary[value] = _result;
      //   }
      if (value.startsWith('#')) {

        if (!_schemasHashDictionary.hasOwnProperty(value)) {
          let _searchedProperty = value.match(/\w+/ig);
          // let _result = _currentSchema[_currentSchema.length - 1][_searchedProperty.shift()];
          let _result = currentSchema[_searchedProperty.shift()];

          while (_searchedProperty.length !== 0) {
            _result = _result[_searchedProperty.shift()];
          }

          _schemasHashDictionary[value] = _result;
        }

      } else if (value.startsWith('/')) {

        if (!_schemasHashDictionary.hasOwnProperty(value)) {
          _schemasHashDictionary[value] = null;
        }

      } else if (utils.isHref(value)) {
        utils.getHrefSchema(value)
          .then((schema) => {
            validation.validate([schema]);

            if (validation.areSchemasValid()) {
              _schemasHashDictionary[value] = schema;

              // _currentSchema.push(schema);
              _recursion(null, schema, _resolveRef, schema);
              // _currentSchema.pop();
            }
          })
          .catch(() => {
            console.log(value, 'error')
            // error handling
          });
      }
    }
  }

  function _recursion(property, value, clb, currentSchema) {
    if (utils.isArray(value)) {
      value.forEach((value) => {
        _recursion(property, value, clb, currentSchema);
      });
    }
    else if (utils.isObject(value)) {
      for (let objProperty in value) {
        if (value.hasOwnProperty(objProperty)) {
          _recursion(objProperty, value[objProperty], clb, currentSchema);
        }
      }
    }
    else {
      // console.log(`${property}: ${value}`);
      return clb(property, value, currentSchema);
      // _resolveRef(property, value);
    }
  }

  // property - searched definition array
  // value - schema
  // function _resolveSharp(property, value) {
  //   if (property === )
  // }

  // function _recursion(property, value) {
  //   if (utils.isArray(value)) {
  //     _arrayRecursionHandler(property, value);
  //   }
  //   else if (utils.isObject(value)) {
  //     _objectRecursionHandler(property, value);
  //   }
  //   else {
  //     // console.log(`${property}: ${value}`);
  //     _resolveRef(property, value);
  //   }
  // }

  // function _arrayRecursionHandler(property, value) {
  //   value.forEach((value) => {
  //     _recursion(property, value);
  //   });
  // }

  // function _objectRecursionHandler(property, value) {
  //   for (let objProperty in value) {
  //     if (value.hasOwnProperty(objProperty)) {
  //       _recursion(objProperty, value[objProperty]);
  //     }
  //   }
  // }

  return {
    initialize: _initialize
  }
})(validationService, utils);

export default core;