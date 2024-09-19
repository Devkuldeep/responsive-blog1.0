const express = require('express');
const app = express();
const posts = require('./data/posts.json');  // Import the posts JSON

app.set('view engine', 'ejs');          // Set EJS as template engine
app.use(express.static('public'));      // Serve static files

// Route for homepage
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Route for individual posts
app.get('/post/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render('post', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
