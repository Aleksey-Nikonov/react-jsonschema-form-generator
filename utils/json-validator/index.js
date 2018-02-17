var Ajv = require('ajv');

(function() {
  var ajv = new Ajv({ allErrors: true });

  var isbn_schema = require('../../examples/schemas/isbn-entity/isbn.json');
  var isbn_schema_data_01 = require('../../examples/schemas/isbn-entity/test-data-01.json');
  test('isbn_schema_data_01', isbn_schema, isbn_schema_data_01);

  var description_schema = require('../../examples/schemas/description-entity/description.json');
  var description_schema_data_01 = require('../../examples/schemas/description-entity/test-data-01.json');
  test('description_schema_data_01', description_schema, description_schema_data_01);

  var exemplar_schema = require('../../examples/schemas/exemplar-entity/exemplar.json');
  var exemplar_schema_data_01 = require('../../examples/schemas/exemplar-entity/test-data-01.json');
  var exemplar_schema_data_02 = require('../../examples/schemas/exemplar-entity/test-data-02.json');
  test('exemplar_schema_data_01', exemplar_schema, exemplar_schema_data_01);
  test('exemplar_schema_data_02', exemplar_schema, exemplar_schema_data_02);

  var old_isbn_schema = require('../../examples/schemas/old/isbn-schema.json');
  var old_isbn_schema_data_01 = require('../../examples/schemas/old/test-data-01.json');
  test('old_isbn_schema_data_01', old_isbn_schema, old_isbn_schema_data_01);

  function test(name, schema, data) {
    var validate = ajv.compile(schema);
    var isValid = validate(data);

    if (isValid) {
      console.log(name + ' is valid');
    } else {
      console.log(name + ' is invalid: ' + ajv.errorsText(validate.errors));
    }
  }
})(Ajv);