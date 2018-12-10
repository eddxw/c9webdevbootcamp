const express = require("express");
const app = express();
const request = require("request");

app.get("/results", (req, res) => {
    request("http://www.omdbapi.com/?apikey=thewdb&s=california", (error, response, strBody) => {
        if(!error && response.statusCode == 200) {
            let body = JSON.parse(strBody);
            res.send(body.Search[0]);
        }
    })
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie App has has started!");
});
