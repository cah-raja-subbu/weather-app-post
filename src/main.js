const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT||3000;
app.use(bodyParser.json()); // support json encoded bodies 
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

console.log('Hello World');

app.get('/weather/get', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    res.send({
        "Address is ": req.query.address

    })
});

app.post('/weather/post', (req, res) => {
    console.log("Received post request");
    console.log(req.query);
    console.log(req.query['geo-city']);

    var city=unescape(req.query['geo-city']);
    //var city2=req.body.queryResult.parameters['geo-city']
    //console.log("city is "+ city);
    if (!city) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(city, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            // res.send({
            //     forecast: forecastData,
            //     location,
            //     address: req.query.address
            // })
            res.send({
                "fulfillmentText":forecastData,
                "fulfillmentMessages":[{"text": {"text": [forecastData]}}],
                "source":""                               
            })
        })
    })
    
    // res.send({
    //     "Address  is  ": city
    // })
});



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})