import * as utils from '../utils';

function BaseError(name, message, details, innerError) {
  this.name = name || 'Error';
  this.message = message || 'Error was happened';
  this.details = details || null;
  // this.innerError = innerError || null;
}

BaseError.prototype.getDescription = function() {
  return (
    `[Name]: ${this.name}\n` +
    `[Message]: ${this.message}\n` +
    `[Details]: ${
      utils.isObjectEmpty(this.details) ? 'none'
      :
      '\n' + utils.printObject(this.details)}`
  );
};

BaseError.Empty = function(details, innerError) {
  this.name = 'Empty error';
  this.message = `The entity is empty`;
  this.details = details || null;
  // this.innerError = innerError || null;
}

BaseError.Validation = function(details, innerError) {
  this.name = 'Validation error';
  this.message = `The entity did not pass the validation`;
  this.details = details || null;
  // this.innerError = innerError || null;
}

export function createError(type, details, innerError) {
  if (typeof BaseError[type] !== 'function') {
    console.error(`There is no specialized constructor with name ${type}`);
  }

  if (typeof BaseError[type].prototype.getDescription !== 'function') {
    BaseError[type].prototype = new BaseError();
  }

  return new BaseError[type](details, innerError);
}

  //======================================================================

export function outputToConsole(errorData) {
  if (utils.isObject(errorData)) {
    console.log(utils.getTimeStamp() + '\n' + errorData.getDescription());
  }

  if (utils.isArray(errorData)) {
    for (var i = errorData.length - 1; i >= 0; i--) {
      console.log(utils.getTimeStamp() + '\n' + errorData[i].getDescription());
    }
  }
}

export function outputToModalWindow() {
  if (utils.isObject(errorData)) {

  }

  if (utils.isArray(errorData)) {

  }
}

//======================================================================

export function mapToBaseError(error) {
  const errorDetails = {
    fileName: error.fileName,
    lineNumber: error.lineNumber,
    columnNumber: error.columnNumber,
    stack: error.stack
  };

  return new BaseError(error.name, error.message, errorDetails);
}