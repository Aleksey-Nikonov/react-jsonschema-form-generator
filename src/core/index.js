import * as validation from '../services/validation';
import * as utils from '../utils';
import * as hashDictionary from './hashDictionary';
import * as formGenerator from './formGenerator';

let _schemas;
let _metaSchemas;
let _schemasHashDictionary;

export function initialize(schemas, metaSchemas) {
  return new Promise((resolve, reject) => {
    _schemas = utils.isObject(schemas) ? [schemas] : schemas;
    _metaSchemas = utils.isObject(metaSchemas) ? [metaSchemas] : metaSchemas;

    validation.validate(_schemas);

    if (validation.areSchemasValid()) {
      validation.validateMeta(_metaSchemas);

      if (validation.areMetaSchemasValid()) {
        hashDictionary.initialize(_schemas, _metaSchemas)
          .then(hash => {
            _schemasHashDictionary = hash;

            resolve();
          });
      }
    }
  });
}

export function generate(treeNodeHandler) {
  return new Promise((resolve, reject) => {
    formGenerator.initialize(_schemas, _schemasHashDictionary)
      .then(formTree => {
        traverse(formTree, treeNodeHandler);
        resolve();
      });
  })
}

function traverse(formTree, clb) {
  // console.log(`type: ${formTree.type} objectName: ${formTree.objectName} objectValue: ${formTree.objectValue}`);
  if (formTree.Component !== null) {
    clb(formTree.Component, formTree.objectName, formTree.objectValue);
  }

  if (formTree.children.length !== 0) {
    for (var i = 0; i < formTree.children.length; i++) {
      traverse(formTree.children[i], clb);
    }
  }
}

// function traverse(formTree, clb) {

// }

// function convertFromTreeToList(formTree) {
//   let stack = [], array = [], path = [];
//   let node;
//   // const metaTypes = [formTypes.ROOT, formTypes.PROPERTIES, formTypes.OBJECT, formTypes.ARRAY];

//   stack.push(formTree);
//   // path.push({ objectName: 'root' });

//   while(stack.length !== 0) {
//     node = stack.pop();
//     path.push(node);

//     if (node.children.length === 0) {
//       console.log(path.map(item => item.objectName).join('.'))
//       array.push(node);
//       path.pop();
//     } else {
//       for (var i = node.children.length - 1; i >= 0; i--) {
//         stack.push(node.children[i]);
//       }
//     }
//   }

//   return array;
// }

// export function getHashDictionary() {
//   return schemasHashDictionary;
// }