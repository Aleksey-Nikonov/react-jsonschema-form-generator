import { configure } from '@storybook/react';
import 'babel-polyfill';

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);