import React, { PureComponent } from 'react';

export default class TestComponent extends PureComponent {
  render() {
    return (
      <div onClick={this.props.onClick}>{this.props.children}</div>
    );
  }
}