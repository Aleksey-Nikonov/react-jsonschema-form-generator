import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TestComponent from '../src/components/Test';

storiesOf('Button', module)
  .add('with text', () => (
    <TestComponent onClick={action('clicked')}>Hello Button</TestComponent>
  ))
  .add('with some numbers', () => (
    <TestComponent onClick={action('clicked')}>123</TestComponent>
  ));