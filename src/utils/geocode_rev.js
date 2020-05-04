const request = require('request')

const geocode_rev = (lat, lon, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(lon) + ',' + encodeURIComponent(lat) + '.json?access_token=pk.eyJ1Ijoia3Jpc2huZW5kdWJlcmEiLCJhIjoiY2s5ZWIwbmltMDAzdTNmcDl4c3R3NG80OSJ9.spniZgKr8IBhvSBk0DSnPg'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to fetch your location!', undefined)
        }
        else {
            var arr = body.features[0].context
            const loc = body.features[0].context[arr.length - 4].text + ', ' + body.features[0].context[arr.length - 2].text + ', ' + body.features[0].context[arr.length - 1].text
            callback(undefined, loc)
        }
    })
}

module.exports = geocode_rev