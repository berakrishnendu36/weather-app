var request = require("request");


const forecast_new = (lat, lon, callback) => {
    var options = {
        method: 'GET',
        url: 'https://api.climacell.co/v3/weather/realtime',
        qs: {
            lat: lat.toString(),
            lon: lon.toString(),
            unit_system: 'si',
            fields: 'temp,feels_like,humidity,wind_speed,wind_direction,baro_pressure,precipitation,visibility,cloud_cover,weather_code,sunrise,sunset',
            apikey: '6zWMOD5PzFIGlaaGK9ihedEdwV0gaxzW'
        },
        json: true
    };

    request(options, function (error, { body } = {}) {
        if (error) {
            callback('Unable to connect to Weather Service', undefined)
        }
        else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast_new
