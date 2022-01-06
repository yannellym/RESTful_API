let express = require("express");
let bodyParser = require("body-parser");
let ejs = require("ejs");
let mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema); // the Article in this document will automatically be turned into 'articles' my mongodb

app.route("/articles")

.get(function(req, res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
       
    });
})

.post(function(req, res){
    Article.find(function(err, foundArticles){
        if(!err){
            res.send(foundArticles);
        } else {
            res.send(err);
        }
       
    });
})

.delete(function(req, res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted all articles");
        } else {
            res.send(err);
        }
    });
 });



app.listen(3000, function() {
    console.log("listening on port 3000");
})

