import React, { PureComponent } from 'react';
import utils from '../utils';

export default class TestRecursion extends PureComponent {
  constructor(props) {
    super(props);

    this.recursion.bind(this);
    this.objectRecursionHandler.bind(this);
    this.arrayRecursionHandler.bind(this);
  }

  recursion(property, value) {
    if (utils.isArray(value)) {
      this.arrayRecursionHandler(property, value);
    }
    else if (utils.isObject(value)) {
      this.objectRecursionHandler(property, value);
    }
    else {
      console.log(`${property}: ${value}`);
    }
  }

  arrayRecursionHandler(property, value) {
    value.forEach((value) => {
      this.recursion(property, value);
    });
  }

  objectRecursionHandler(property, value) {
    for (let objProperty in value) {
      if (value.hasOwnProperty(objProperty)) {
        this.recursion(objProperty, value[objProperty]);
      }
    }
  }

  render() {
    this.recursion(null, this.props.schema);
    return <div></div>;
  }
}