import React, { Fragment } from 'react';

export default ({ name, data: { title, description, pattern } }) => (
  <div className='form-group'>
    <label htmlFor={name}>{title || name}</label>
    <input type="text" className="form-control" id={name} pattern={pattern || ''} />
    { description && <small className="form-text text-muted">{description}</small> }
  </div>
);