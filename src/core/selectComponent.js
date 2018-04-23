import React from 'react';
import formTypes from '../constants/formTypes';

import FormTitle from '../components/displays/FormTitle';
import FormDescription from '../components/displays/FormDescription';
import StringField from '../components/inputs/StringField';
import IntegerField from '../components/inputs/IntegerField';
import BooleanField from '../components/inputs/BooleanField';
import NumberField from '../components/inputs/NumberField';
import EnumField from '../components/inputs/EnumField';
import DateField from '../components/inputs/DateField';

export default function(type) {
  switch(type) {
    case formTypes.TITLE:
      return FormTitle;
    case formTypes.DESCRIPTION:
      return FormDescription;
    case formTypes.STRING:
      return StringField;
    case formTypes.INTEGER:
      return IntegerField;
    case formTypes.BOOLEAN:
      return BooleanField;
    case formTypes.NUMBER:
      return NumberField;
    case formTypes.ENUM:
      return EnumField;
    case formTypes.DATE:
      return DateField;
    case formTypes.ARRAY:
      return null;
    default:
      return null;
  }
}