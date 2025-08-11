const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


// Middleware global
app.use(cors());
app.use(express.json()); // lire le JSON

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connecté à MongoDB"))
    .catch(err => console.error("❌ Erreur MongoDB :", err));

// Import des routes
const authRoutes = require('./routes/auth');
const livresRoutes = require('./routes/livres');

app.use('/api/auth', authRoutes);
app.use('/api/livres', livresRoutes);

// Démarrage serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));
