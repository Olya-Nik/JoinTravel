const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

const myImage = mongoose.model('myImage', imageSchema);

module.exports = { myImage };