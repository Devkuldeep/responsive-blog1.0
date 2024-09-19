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
// app.get('/post/:id', (req, res) => {
//     const post = posts.find(p => p.id == req.params.id);
//     if (post) {
//         res.render('post', { post: post });
//     } else {
//         res.status(404).send('Post not found');
//     }
// });




app.get('/post/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    const currentIndex = posts.findIndex(p => p.id === postId);
    const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    const relatedPosts = posts
        .filter(p => p.id !== postId)
        .slice(0, 3);

    res.render('post', { 
        post: post, 
        previousPost: previousPost, 
        nextPost: nextPost, 
        relatedPosts: relatedPosts 
    });
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
