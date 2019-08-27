const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { User } = require('../models/User')


router.get('/', function (req, res) {
    res.send('Hi')
})



router.post('/map', async function (req, res){
    const resp = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=55.704724199999994,37.5959547&radius=1500&type=restaurant&keyword=cafe&key=AIzaSyAIINAfLqMXFcgFSBFbxrm3oxIgnSM-Gfk')
    const json = await resp.json();
    //console.log(json)
    res.json(json);
})



module.exports = router