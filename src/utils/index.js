const utils = ((validation) => {
  function _isObjectEmpty(obj) {
    if (!obj) {
      return true;
    }

    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return true;
  }

  function _getTimeStamp() {
    const date = new Date();

    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    return `[${hours}:${minutes}:${seconds}]`;
  }

  function _printObject(obj) {
    let output = '';

    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        output += `${prop}: ${obj[prop]}\n`
      }
    }

    // removing the last new line
    output = output.substring(0, output.length - 1);

    return output;
  }

  function _isStringEmpty(str) {
    return (!str || 0 === str.length);
  }

  function _isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
    // return (!!obj) && (obj.constructor === Object);
  }

  function _isArray(arr) {
    return Array.isArray(arr);
    // return (!!arr) && (arr.constructor === Array);
  }

  // /(глава \d+(\.\d)*)/i;
  const _hrefRegExp = new RegExp('^(http|https)://');
  function _isHref(source) {
    return _hrefRegExp.test(source);
  }

  function _getHrefSchema(address) {
    return new Promise((resolve, reject) => {
      fetch(address, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(r => r.json())
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
    })
  }

  return {
    isObjectEmpty: _isObjectEmpty,
    getTimeStamp: _getTimeStamp,
    printObject: _printObject,
    isStringEmpty: _isStringEmpty,
    isObject: _isObject,
    isArray: _isArray,
    isHref: _isHref,
    getHrefSchema: _getHrefSchema
  }
})();

export default utils;