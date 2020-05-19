var request = require("request");

const hcast = (lat, lon, callback) => {
    var options = {
        method: 'GET',
        url: 'https://api.climacell.co/v3/weather/forecast/daily',
        qs: {
            lat: lat.toString(),
            lon: lon.toString(),
            unit_system: 'si',
            start_time: 'now',
            fields: 'temp,precipitation_probability,weather_code,feels_like',
            apikey: '6zWMOD5PzFIGlaaGK9ihedEdwV0gaxzW'
        },
        json: true
    };

    request(options, function (error, { body }) {
        if (error) {
            callback('Unable to retrieve daily data', undefined)
        }
        else {
            const ddata = []
            for (let i = 0; i <= 8; i++) {
                ddata.push(body[i])
            }
            callback(undefined, ddata)
        }
    });
}

module.exports = hcast