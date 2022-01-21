const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    } else {
      const data = JSON.parse(body);
      callback(null, data['ip']);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);

    callback(null, { latitude, longitude });
  });
};

// Don't need to export the other function since we are not testing it right now.
module.exports = { fetchCoordsByIP };
module.exports = { fetchMyIP };
