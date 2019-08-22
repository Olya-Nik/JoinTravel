const express = require('express');
const router = express.Router();
const {User} = require('../models/User')


router.get('/', function (req, res) {
    res.send('Hi')
})

router.post('/profile', async function (req, res) {
    const user = new User ({
        name: req.body.name,
        age: req.body.age,
        avatar: req.body.avatar,
        country: req.body.country,
        city: req.body.city
    })
    await user.save()
    console.log(user)
    res.end()
})

module.exports = router