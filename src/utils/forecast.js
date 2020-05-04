const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=04ff8d6cf3171ad6838b6ee9fe8a2060&query=' + lat + ',' + lon + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else if (body.location.name === null) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast