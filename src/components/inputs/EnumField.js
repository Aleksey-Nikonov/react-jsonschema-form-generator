import React, { Fragment } from 'react';

export default ({ name, data }) => {
  const { title, description } = data;
  return (
    <div className='form-group'>
      <label htmlFor={name}>{title || name}</label>
      <select className="form-control" id={name}>
        {
          data.enum.map((value, index) => <option key={index}>{value}</option>)
        }
      </select>
      { description && <small className="form-text text-muted">{description}</small> }
    </div>
  );
};