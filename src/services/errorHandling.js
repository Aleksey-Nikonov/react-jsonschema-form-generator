import utils from '../utils';

const errorHandlingService = ((utils) => {
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

  function _createError(type, details, innerError) {
    if (typeof BaseError[type] !== 'function') {
      console.error(`There is no specialized constructor with name ${type}`);
    }

    if (typeof BaseError[type].prototype.getDescription !== 'function') {
      BaseError[type].prototype = new BaseError();
    }

    return new BaseError[type](details, innerError);
  }

  //======================================================================

  function _outputToConsole(errorData) {
    if (utils.isObject(errorData)) {
      console.log(utils.getTimeStamp() + '\n' + errorData.getDescription());
    }

    if (utils.isArray(errorData)) {
      for (var i = errorData.length - 1; i >= 0; i--) {
        console.log(utils.getTimeStamp() + '\n' + errorData[i].getDescription());
      }
    }
  }

  function _outputToModalWindow() {
    if (utils.isObject(errorData)) {

    }

    if (utils.isArray(errorData)) {

    }
  }

  //======================================================================

  function _mapToBaseError(error) {
    const _errorDetails = {
      fileName: error.fileName,
      lineNumber: error.lineNumber,
      columnNumber: error.columnNumber,
      stack: error.stack
    };
    const _error = new BaseError(error.name, error.message, _errorDetails);

    return _error;
  }

  return {
    createError: _createError,
    outputToConsole: _outputToConsole,
    outputToModalWindow: _outputToModalWindow,
    mapToBaseError: _mapToBaseError
  }
})(utils);

export default errorHandlingService;