var request = require("request");

const hcast = (lat, lon, callback) => {
    var options = {
        method: 'GET',
        url: 'https://api.climacell.co/v3/weather/forecast/hourly',
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
            callback('Unable to retrieve hourly data', undefined)
        }
        else {
            const hdata = []
            for (let i = 0; i <= 6; i++) {
                hdata.push(body[i])
            }
            callback(undefined, hdata)
        }
    });
}

module.exports = hcast