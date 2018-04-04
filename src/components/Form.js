import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as core from '../core';

export default class Form extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    core.initialize(this.props.schemas)
      .then(() => console.log('Hash dictionary is loaded'));
  }

  render() {
    return (
      <div>...</div>
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