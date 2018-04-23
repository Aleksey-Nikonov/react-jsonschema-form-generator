import React, { Fragment } from 'react';

export default ({ name, data }) => (
  <Fragment>
    <div className="form-check">
      <input className="form-check-input" type="radio" name={name} value="false" id={name + '0'} defaultChecked={!data.default} />
      <label className="form-check-label" htmlFor={name + '0'}>
        False
      </label>
    </div>
    <div className="form-check">
      <input className="form-check-input" type="radio" name={name} value="true" id={name + '1'} defaultChecked={data.default} />
      <label className="form-check-label" htmlFor={name + '1'}>
        True
      </label>
    </div>
  </Fragment>
);