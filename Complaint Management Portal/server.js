const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const config = require('config');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Config
const db = config.get("mongoURI");

// Connect to Mongo
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(db)
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/complaints', require('./routes/api/complaints'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));