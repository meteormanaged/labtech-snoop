//Check the settings.
const checkSettings = settings => {
  'use strict';
  const properties = ['host', 'user', 'password', 'database'];

  if (typeof settings != 'object') {
    return false;
  }

  const verify = () => {
    let verified = true;
    properties.forEach(property => {
      if (!settings[property]) {
        verified = false;
      };
    });
    return verified;
  };

  return verify();
};

//Build and return the pool for use.
const pool = settings => {
  'use strict';
  if (!checkSettings(settings)) {
    return false;
  };

  const mysql = require('mysql');
  settings.connectionLimit = 10;
  const pool  = mysql.createPool(settings);
  return pool;
};

module.exports = {
  pool: pool,
};

// For testing private functions.
if (process.env.NODE_ENV === 'test') {
  module.exports.checkSettings = checkSettings;
};
