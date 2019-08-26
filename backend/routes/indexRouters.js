const express = require('express');
const router = express.Router();
const { User } = require('../models/User')


router.get('/', function (req, res) {
    res.send('Hi')
})


router.get('/map', async function (req, res){
    const resp = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyAIINAfLqMXFcgFSBFbxrm3oxIgnSM-Gfk`)
    const json = await resp.json();
    console.log(json)
})

// router.post('/profilesend', async function (req, res) {
//     console.log(req.body)
//     const user = new User ({
//         name: req.body.name,
//         age: req.body.age,
//         avatar: req.body.avatar,
//         country: req.body.country,
//         city: req.body.city,
//         date: req.body.date
//     })
//     await user.save()
//     console.log(user)
//     res.end()
// })




module.exports = router