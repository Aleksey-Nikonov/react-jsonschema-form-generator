import React, { Fragment } from 'react';

export default ({ name, data: { title, description } }) => (
  <div className='form-group'>
    <label htmlFor={name}>{title || name}</label>
    <input type="date" className="form-control" id={name} />
    { description && <small className="form-text text-muted">{description}</small> }
  </div>
);