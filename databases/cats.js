const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

// Cat.create({
//     name: "Kata",
//     age: 2,
//     temperament: "Agressive"
// }, (err, cat) => {
//     if (err) {
//         console.log("err");
//     }
//     else {
//         console.log(cat);
//     }
// });

//add a new cat to the DB

// var newCat = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// newCat.save((err, cat) => {
//     if (err) {
//         console.log("Something went wrong!")
//     }
//     else {
//         console.log("We just saved a cat to the db")
//         console.log(cat);
//     }
// });

// retrieve all cats from the DB and console.log each one

Cat.find({},(err, cats)=>{
    if(err){
        console.log("Oh No, Error!");
        console.log("err");
    }else{
        console.log("ALL THE CATS...");
        console.log(cats);
    }
});
