import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import 'bootstrap/dist/css/bootstrap.min.css';

import TestComponent from '../src/components/Test';
import ExampleForm from '../examples/ExampleForm/ExampleForm.js';

import isbnSchema from '../examples/schemas/isbn-schema.json';
import uiIsbnSchema from '../examples/schemas/ui-isbn-schema.json';

storiesOf('Example schemas', module)
  .add('ISBN', () => (
    <ExampleForm schema={isbnSchema} uiSchema={uiIsbnSchema} />
  ))
  .add('Library', () => (
    <TestComponent onClick={action('clicked')}>123</TestComponent>
  ));

storiesOf('Button', module)
  .add('with text', () => (
    <TestComponent onClick={action('clicked')}>Hello Button</TestComponent>
  ))
  .add('with some numbers', () => (
    <TestComponent onClick={action('clicked')}>123</TestComponent>
  ));