const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const forecast_new = require('./utils/forecast_new')
const geocode_rev = require('./utils/geocode_rev')
const hcast = require('./utils/hcast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

//Setting directory
const dirPublic = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

//Setting up views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static pages
app.use(express.static(dirPublic))



app.get('', (req, res) => {
    return res.render('index', {
        title: 'Weather',
        name: 'Krishnendu',
    })
})

// app.get('/help', (req, res) => {
//     res.render('help', {
//         title: 'Help'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         name: 'Krishnendu',
//         title: 'About'
//     })
// })

app.get('/weather/rdata', (req, res) => {
    if (!(req.query.latitude && req.query.longitude)) {
        return res.send({ error: 'Cannot Access Your Location' })
    }
    forecast_new(req.query.latitude, req.query.longitude, (error, rdata) => {
        if (error) {
            return res.send({ error: error })
        }
        res.send(rdata)
    })
})

app.get('/weather/ldata', (req, res) => {
    if (!(req.query.latitude && req.query.longitude)) {
        return res.send({ error: 'Cannot Access Your Location' })
    }
    geocode_rev(req.query.latitude, req.query.longitude, (error, ldata) => {
        if (error) {
            return res.send({ error: error })
        }
        res.send({ location: ldata })
    })
})

app.get('/weather/sdata', (req, res) => {
    if (!(req.query.addr)) {
        return res.send({ error: 'Cannot Access Your Location' })
    }
    geocode(decodeURIComponent(req.query.addr), (error, sdata) => {
        if (error) {
            return res.send({ error: error })
        }
        res.send(sdata)
    })
})


app.get('/weather/hdata', (req, res) => {
    if (!(req.query.latitude && req.query.longitude)) {
        return res.send({ error: 'Cannot Access Your Location' })
    }
    hcast(req.query.latitude, req.query.longitude, (error, hdata) => {
        if (error) {
            return res.send({ error: error })
        }
        res.send(hdata)
    })
})

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404 Error',
//         errorMessage: 'Help page not found'
//     })
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404 Error',
//         errorMessage: 'Page not found'
//     })
// })

app.listen(3000, () => {
    console.log('Server up on port 3000')
})