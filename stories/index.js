import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Form from '../src/components/Form';

import descriptionSchema from '../examples/schemas/description-entity/description.json';
import exemplarSchema from '../examples/schemas/exemplar-entity/exemplar.json';
import isbnSchema from '../examples/schemas/isbn-entity/isbn.json';
import tempSchema from '../examples/schemas/temp-schema-href-entity/temp-schema-href.json';
import tempErrorSchema from '../examples/schemas/temp-schema-href-error-entity/temp-schema-href-error.json';
import schemaArray from '../examples/schemas/schema-array-entity/schema-array.json';

// import 'bootstrap/dist/css/bootstrap.min.css';

// import TestComponent from '../src/components/Test';
// import ExampleForm from '../examples/ExampleForm/ExampleForm.js';

// import isbnSchema from '../examples/schemas/old/isbn-schema.json';
// import uiIsbnSchema from '../examples/schemas/old/ui-isbn-schema.json';

// storiesOf('Example schemas', module)
//   .add('ISBN', () => (
//     <ExampleForm schema={isbnSchema} uiSchema={uiIsbnSchema} />
//   ))
//   .add('Library', () => (
//     <TestComponent onClick={action('clicked')}>123</TestComponent>
//   ));

// storiesOf('Button', module)
//   .add('with text', () => (
//     <TestComponent onClick={action('clicked')}>Hello Button</TestComponent>
//   ))
//   .add('with some numbers', () => (
//     <TestComponent onClick={action('clicked')}>123</TestComponent>
//   ));

storiesOf('ISBN schemas', module)
  .add('description', () => (
    <Form schemas={descriptionSchema} />
  ))
  .add('description + isbn meta', () => (
    <Form schemas={descriptionSchema} metaSchemas={isbnSchema} />
  ))
  .add('exemplar + isbn meta', () => (
    <Form schemas={exemplarSchema} metaSchemas={isbnSchema} />
  ))
  .add('isbn', () => (
    <Form schemas={isbnSchema} />
  ))
  .add('3 schemas', () =>(
    <Form schemas={[descriptionSchema, exemplarSchema, isbnSchema]} />
  ))
  .add('3 schemas (isbn meta)', () =>(
    <Form schemas={[descriptionSchema, exemplarSchema]} metaSchemas={[isbnSchema]} />
  ))
  .add('3 schemas (href)', () =>(
    <Form schemas={[descriptionSchema, exemplarSchema, tempSchema]} />
  ))
  .add('4 schemas (href, isbn meta)', () =>(
    <Form schemas={[descriptionSchema, exemplarSchema, tempSchema]} metaSchemas={[isbnSchema]} />
  ))
  .add('4 schemas (error href, isbn meta)', () =>(
    <Form schemas={[descriptionSchema, exemplarSchema, tempErrorSchema]} metaSchemas={[isbnSchema]} />
  ))
  .add('schema with array', () =>(
    <Form schemas={schemaArray} />
  ));

storiesOf('Tests', module)
  .add('no props', () => (
    <Form />
  ))
  .add('undefined schema', () => (
    <Form schemas={undefined} />
  ))
  .add('array of empty objects', () => (
    <Form schemas={[{}, {}, {}]} />
  ))
  .add('empty space', () => (
    <div>almost empty space</div>
  ));