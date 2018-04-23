import React, { Fragment } from 'react';

export default ({ name, data: { title, description, minimum, maximum } }) => (
  <div className='form-group'>
    <label htmlFor={name}>{title || name}</label>
    <input type="number" className="form-control" id={name} min={minimum === 0 ? 0 : Number.MIN_VALUE} max={maximum === 0 ? 0 : Number.MAX_VALUE} />
    { description && <small className="form-text text-muted">{description}</small> }
  </div>
);