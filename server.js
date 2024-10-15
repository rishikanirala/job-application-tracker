const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jobTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create a schema and model for applications
const applicationSchema = new mongoose.Schema({
    company: String,
    position: String,
    date: String,
    status: String,
});

const Application = mongoose.model('Application', applicationSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to add a new application
app.post('/applications', async (req, res) => {
    const application = new Application(req.body);
    try {
        await application.save();
        res.status(201).send(application);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Endpoint to get all applications
app.get('/applications', async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).send(applications);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
