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


/////////////// Request targeting all articles ///////////////////////////

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


/////////////// Request targeting a specific article ///////////////////////////

app.route("/articles/:articleTitle")
// req.params.articleTitle = '';

.get(function(req, res){

    Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if(foundArticle){
    res.send(foundArticle);
    }else {
    res.send("No articles matching that title were found.");
    }
  });
})

.put(function(req, res){
 Article.replaceOne(
    {title:req.params.articleTitle}, 
    {title:req.body.title, content:req.body.content},
    function(err){
        if(!err){
            res.send("Successfully updated article.");
            }
        }
    );
})

.patch(function(req, res){
    Article.updateOne(
        {title:req.params.articleTitle}, 
        {$set:req.body},
        function(err){
            if(!err){
                res.send("successfully updated article");
            }else {
                res.send(err);
            }
        } 
      )
   })

.delete(function(req,res){
    Article.deleteOne(
        {title:req.params.articleTitle}, 
        function(err){
            if(!err){
                res.send("successfully deleted article");
            } else {
                res.send(err);
            }
        }
     )
 });



app.listen(3000, function() {
    console.log("listening on port 3000");
})


//use updateOne on PATCH

// replaceOne on PUT