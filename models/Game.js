const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    developer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Developer', 
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);