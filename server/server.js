const express = require('express');
const app = express();
const CppRunner = require('./controllers/Compiler');
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// GET route to render the form
app.get('/', (req, res) => {
    res.render('index');
});

// POST route to handle form submission and run the C++ code
app.post('/compile', async (req, res) => {
    const { code } = req.body; // Get the code from the form input
    const result = await CppRunner(code, '2 3'); // You can replace '2 3' with dynamic input if needed

    // Send the result as plain text response
    res.send(result);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
