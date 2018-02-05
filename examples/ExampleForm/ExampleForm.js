import React from 'react';
import Form from "react-jsonschema-form";

import "./ExampleForm.css";

const log = (type) => console.log.bind(console, type);

const ExampleForm = ({ schema, uiSchema }) => (
  <div className="main_container">
    <div className="form_container">
      <Form
        schema={schema}
        uiSchema={uiSchema}
        onChange={log("changed")}
        onSubmit={log("submitted")}
        onError={log("errors")}
      />
    </div>
  </div>
);

export default ExampleForm;