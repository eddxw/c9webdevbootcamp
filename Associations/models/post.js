const mongoose = require("mongoose");

// Post - title, content
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

module.exports = mongoose.model("Post", postSchema);
