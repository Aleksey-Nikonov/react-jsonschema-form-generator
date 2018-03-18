import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import core from '../core';

export default class Form extends PureComponent {
  constructor(props) {
    super(props);

    const { schemas, onSubmit } = props;

    core.initialize(schemas);
  }

  render() {
    return (
      <div>test</div>
    );
  }
}

Form.defaultProps = {
  schemas: [{}]
};

Form.propTypes = {
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  // schemas: PropTypes.array.isRequired,
  onSubmit: PropTypes.func
};