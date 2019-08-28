const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { User } = require('../models/User')
require('dotenv').config()

router.get('/', function (req, res) {
    res.send('Hi')
})



router.post('/map', async function (req, res) {
    // console.log(req.body.latitude)
    let coordA = String(req.body.latitude);
    let coordB = String(req.body.longitude);
    console.log(req.body.trip);
    let typeTrip = req.body.trip;
    const resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordA},${coordB}&radius=5000&type=${typeTrip}&keyword=sights&key=`)
    const json = await resp.json();
    console.log(json);

    console.log(coordA, coordB);
    let hash = json.results[0].photos[0].photo_reference;
    let arrLink = [];
    //console.log(hash)
    for (let i = 0; i < json.results.length; i++) {
        if (!json.results[i].photos) {
            continue;
        }
        let hash = json.results[i].photos[0].photo_reference;
        const resp1 = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hash}&key=`)
        const image = await resp1.url;
        json.results[i].image = image;
        // arrLink.push(json1)
        console.log(image);
    }

    // console.log(a);
    // console.log(json)
    res.json(json.results);
})

// router.post('/img', async function (req, res) {
//     console.log(req.body)
//     let bingo = req.body
//     const resp1 = await fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${bingo}&key=AIzaSyAIINAfLqMXFcgFSBFbxrm3oxIgnSM-Gfk`)
//     const json1 = await resp1.json();
//     const aa = req.body;
//     // console.log(aa);
//     // console.log(json)
//     res.json(json1);
// })




module.exports = router