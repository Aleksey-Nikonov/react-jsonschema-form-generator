import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import * as core from '../core';
import * as utils from '../utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Form.css';

export default class Form extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      formComponents: []
    };

    this.treeNodeHandler = this.treeNodeHandler.bind(this);
    this.completeHandler = this.completeHandler.bind(this);
  }

  componentWillMount() {
    core.initialize(this.props.schemas, this.props.metaSchemas)
      .then(() => core.generate(this.treeNodeHandler))
      .then(() => this.completeHandler());
  }

  treeNodeHandler(Component, name, data) {
    this.setState({ formComponents: [...this.state.formComponents, { Component, name, data }] });
  }

  completeHandler() {
    this.setState({ isLoading: false });
  }

  render() {
    const { formComponents, isLoading } = this.state;
    const { onSubmit, action } = this.props;

    return (
      <Fragment>
        {
          isLoading ?
          <div>Loading...</div>
          :
          <form onSubmit={onSubmit} action={action}>
            {!formComponents.length !== 0 && formComponents.map((value, index) => {
                const { Component, name, data } = value;
                return <Component name={name} data={data} key={index} />;
              }
            )}
            <button type='submit' className='btn'>Submit</button>
          </form>
        }
      </Fragment>
    );
  }
}

Form.defaultProps = {
  schemas: [{}],
  metaSchemas: [{}],
  action: '#',
  onSubmit: function() { alert('Ok'); }
};

Form.propTypes = {
  schemas: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]).isRequired,
  metaSchemas: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  action: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};