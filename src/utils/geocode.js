const request = require('request')

const geocode = (address, callback) => {
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWpwdXJjaGFzZTA1MzEiLCJhIjoiY2s5bGRsMGF4MDA3cTNzbHBlbHV5a3VmNyJ9.gPonkOzB342h8CLTV4MnQg&limit=1'
    //pk.eyJ1IjoibWpwdXJjaGFzZTA1MzEiLCJhIjoiY2s5bGRsMGF4MDA3cTNzbHBlbHV5a3VmNyJ9.gPonkOzB342h8CLTV4MnQg
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode