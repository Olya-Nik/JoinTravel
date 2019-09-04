const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { User } = require('../models/User')
require('dotenv').config();
const map = process.env.GOOGLEMAP;

router.get('/', function (req, res) {
    res.send('Hi')
});

router.post('/map', async function (req, res) {
    // console.log(req.body.latitude)
    let coordA = String(req.body.latitude);
    let coordB = String(req.body.longitude);
    console.log(req.body.trip);
    let typeTrip = req.body.trip;
    const resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordA},${coordB}&radius=50000&type=${typeTrip}&keyword=sights&key=${map}`)
    const json = await resp.json();
    // console.log(json);

    // console.log(coordA, coordB);
    let hash = json.results[0].photos[0].photo_reference;
    let arrLink = [];
    
    for (let i = 0; i < json.results.length; i++) {
        if (!json.results[i].photos) {
            continue;
        }
        let hash = json.results[i].photos[0].photo_reference;
        const resp1 = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hash}&key=AIzaSyAIINAfLqMXFcgFSBFbxrm3oxIgnSM-Gfk`)
        const image = await resp1.url;
        json.results[i].image = image;
        // console.log(image);
    }

    // console.log(a);
    // console.log(json)
    res.json(json.results);
});

module.exports = router