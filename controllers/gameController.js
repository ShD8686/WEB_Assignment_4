const Game = require('../models/Game');

exports.getAll = async (req, res) => {
    try {
        const games = await Game.find().populate('developer', 'name');
        res.json(games);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getOne = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('developer');
        if (!game) return res.status(404).json({ error: "Game not found" });
        res.json(game);
    } catch (err) { res.status(400).json({ error: "Invalid ID" }); }
};

exports.create = async (req, res) => {
    try {
        const newGame = new Game(req.body);
        await newGame.save();
        res.status(201).json(newGame);
    } catch (err) { res.status(400).json({ error: err.message }); }
};

exports.delete = async (req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id);
        res.json({ message: "Game deleted" });
    } catch (err) { res.status(400).json({ error: err.message }); }
};