const bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    expressSanitezer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitezer());

// MONGOOSE/MODEL CONFIG
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTful ROUTES

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// INDEX ROUTE 
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { blogs: blogs });
        }
    });

});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
    // create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.create(req.body.blog, (err, newBlog) => {
        if (err) {
            res.render("new");
        }
        else {
            res.redirect("/blogs");
        }
    });
});

// Show Route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", { blog: foundBlog });
        }
    })
});

// Edit Route
app.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.render("edit", { blog: foundBlog });
        }
    });

});
// update route
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    Blog.findOneAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect(`/blogs/${req.params.id}`);
        }
    });
});

// delete route
app.delete("/blogs/:id", (req, res) => {
    Blog.findOneAndDelete(req.params.id, (err, updatedBlog) => {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect(`/blogs`);
        }
    });
});

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("server is right");
});
