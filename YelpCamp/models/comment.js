const mongoose = require("mongoose");

const commentSchemma = new mongoose.Schema({
    text: String,
    author: String,
});

module.exports = mongoose.model("Comment", commentSchemma);
