require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/lms_db');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/members', require('./routes/members'));
app.use('/api/transactions', require('./routes/transactions'));

// simple route
app.get('/', (req, res) => res.send('Library Management System API running'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
