import React, { PureComponent } from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import TestComponent from './components/Test';

const root = document.createElement('div');
document.body.appendChild(root);

render(<TestComponent>123123</TestComponent>, root);