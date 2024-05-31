const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/carLogin', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Define a schema for user model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Function to save model with async/await
async function saveModel(model) {
    try {
        await model.save();
        console.log("Save successful");
    } catch (error) {
        console.error("Error:", error);
        throw error; // Re-throw the error to be caught by the caller
    }
}

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            // res.send('Login successful');
            return res.redirect('/success');
        } else {
            res.send('Enter a valid account');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, 'success.html'));
});

// Function to save model with async/await
async function saveModel(model) {
    try {
        await model.save();
        console.log("Save successful");
    } catch (error) {
        console.error("Error:", error);
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/create.html');
});

app.post('/create-account', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });

    // Save user model using async/await
    saveModel(newUser);

    res.status(200).send('User creation request received');
});
app.get('/create-account', (req, res) => {
    res.sendFile(path.join(__dirname, 'create.html'));
});

// Correcting the route for handling the form submission
app.post('/create-account', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send('Account already exists');
        }

        // If username doesn't exist, create a new user
        const newUser = new User({ username, password });
        await saveModel(newUser); // Wait for the save operation to complete

        res.redirect('/success'); // Redirect to success page after account creation
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
