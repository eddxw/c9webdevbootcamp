const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog_demo", { useNewUrlParser: true });

// Post - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Post = mongoose.model("Post", postSchema);

// User - email, name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

const User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermaione Granger",
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding, go to potions class to learn it!"
// });

// newUser.save((err, user) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on apples",
//     content: "They are delicious",
// });

// newPost.save((err, post) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(post);
//     }
// });

User.findOne({ name: "Hermaione Granger" }, (err, user) => {
    if (err) {
        console.log(err);
    }
    else {
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort. Voldermort. Voldermort."
        });
        user.save((err, user) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(user);
            }
        })
    }
});
