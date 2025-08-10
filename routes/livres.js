const express = require('express');
const Livre = require('../models/Livre');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ajouter un livre (protégé par JWT)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { titre, auteur, resume } = req.body;
        const livre = new Livre({ titre, auteur, resume });
        await livre.save();
        res.status(201).json({ message: "Livre ajouté", livre });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Afficher les livres avec pagination (accessible à tous)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const livres = await Livre.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const total = await Livre.countDocuments();
        res.json({
            page,
            totalPages: Math.ceil(total / limit),
            totalLivres: total,
            livres
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
