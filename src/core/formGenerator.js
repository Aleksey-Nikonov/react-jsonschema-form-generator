import * as utils from '../utils';
import selectComponent from './selectComponent';
import formTypes from '../constants/formTypes';

let schemasHashDictionary;
let resultSchema;

function FormTree(type, objectName, objectValue, Component) {
  this.type = type;
  this.objectName = objectName;
  this.objectValue = objectValue;
  this.Component = selectComponent(this.type);
  this.children = [];
}

FormTree.prototype.addFormTree = function(type, objectName, objectValue) {
  const newFormTree = new FormTree(type, objectName, objectValue);
  this.children.push(newFormTree);
  return newFormTree;
}

export function initialize(schemas, hash) {
  return new Promise((resolve, reject) => {
    schemasHashDictionary = hash;
    resultSchema = new FormTree(formTypes.OBJECT, 'rootNode', null);

    schemas.forEach((schema, index) => {
      // resolveValue(schema.title ? schema.title : index, schema, resultSchema);
      resolveValue(`schema${index}`, schema, resultSchema);
    });

    resolve(resultSchema);
  });
}

function resolveValue(objectName, objectValue, formTree) {
  if (objectValue === null) {
    return;
    // todo create error
  }

  // cases with specifed type
  if (objectValue.hasOwnProperty('type')) {
    switch (objectValue['type']) {
      case 'string':
        resolveString(objectName, objectValue, formTree);
        break;
      case 'object':
        resolveObject(objectName, objectValue, formTree);
        break;
      case 'array':
        resolveArray(objectName, objectValue, formTree);
        break;
      case 'integer':
        formTree.addFormTree(formTypes.INTEGER, objectName, objectValue);
        break;
      case 'boolean':
        formTree.addFormTree(formTypes.BOOLEAN, objectName, objectValue);
        break;
      case 'number':
        formTree.addFormTree(formTypes.NUMBER, objectName, objectValue);
        break;
    }
  }

  // cases withot specified type
  if (objectValue.hasOwnProperty('enum')) {
    formTree.addFormTree(formTypes.ENUM, objectName, objectValue);
  }

  if (objectValue.hasOwnProperty('$ref')) {
    resolveRef(objectName, objectValue, formTree);
  }
}

function resolveString(objectName, objectValue, formTree) {
  if (objectValue.hasOwnProperty('format')) {
    if (objectValue['format'] === 'date') {
      formTree.addFormTree(formTypes.DATE, objectName, objectValue);
    }
    // ...
  } else {
    formTree.addFormTree(formTypes.STRING, objectName, objectValue);
  }
}

function resolveObject(objectName, objectValue, formTree) {
  formTree = formTree.addFormTree(formTypes.OBJECT, objectName, null);

  resolveMeta(objectName, objectValue, formTree);

  if (objectValue.hasOwnProperty('properties')) {
    formTree = formTree.addFormTree(formTypes.OBJECT, 'properties', null);

    for (let property in objectValue['properties']) {
      resolveValue(property, objectValue['properties'][property], formTree);
    }
  }
}

function resolveArray(objectName, objectValue, formTree) {
  formTree = formTree.addFormTree(formTypes.ARRAY, objectName, null);

  resolveMeta(objectName, objectValue, formTree);

  if (objectValue.hasOwnProperty('items')) {
    // formTree = formTree.addFormTree(formTypes.ITEMS, 'items', null);

    resolveValue('items', objectValue['items'], formTree);
  }
}

function resolveMeta(objectName, objectValue, formTree) {
  if (objectValue.hasOwnProperty('title')) {
    formTree.addFormTree(formTypes.TITLE, 'title', { title: objectValue['title'] });
  }

  if (objectValue.hasOwnProperty('description')) {
    formTree.addFormTree(formTypes.DESCRIPTION, 'description', { description: objectValue['description'] });
  }
}

function resolveRef(objectName, objectValue, formTree) {
  const resolvedSchema = schemasHashDictionary[objectValue['$ref']];

  if (resolvedSchema) {
    // todo object assign hash with object value
    // schemasHashDictionary[objectValue['$ref']].description = objectValue.description;
    resolveObject(objectName, schemasHashDictionary[objectValue['$ref']], formTree);
  } else {
    // todo create error
  }
}

// function pushToResultSchema(type, objectName, objectValue) {
//   // uniqueElementKey = `${++elementsCounter}_${type}_${currentSchemaName}`;
//   uniqueFieldKey = `${++fieldsCounter}/${currentSchemaName}/${objectName}/${type}`;
//   resultSchema[uniqueFieldKey] = {
//     Component: selectComponent(type),
//     fieldName: objectName,
//     data: objectValue
//   }
// }