export function isObjectEmpty(obj) {
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

export function getTimeStamp() {
  const date = new Date();

  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

  return `[${hours}:${minutes}:${seconds}]`;
}

export function printObject(obj) {
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

export function isStringEmpty(str) {
  return (!str || 0 === str.length);
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
  // return (!!obj) && (obj.constructor === Object);
}

export function isArray(arr) {
  return Array.isArray(arr);
  // return (!!arr) && (arr.constructor === Array);
}

// /(глава \d+(\.\d)*)/i;
const hrefRegExp = new RegExp('^(http|https)://');
export function isHref(source) {
  return hrefRegExp.test(source);
}

export function getHrefSchema(address) {
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
  });
}