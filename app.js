//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dash=require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const mongoose= require("mongoose");

mongoose.connect("mongodb+srv://saimadala1872:Madala187@cluster0.wyspesa.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {

 title: String,

 content: String

};
const Post = mongoose.model("Post", postSchema);
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//let postlist=[];

app.get("/",function(req,res){
Post.find().then(function(postlist){
  res.render("home", {text1:homeStartingContent,postlist:postlist});
}).catch(function(err){
  console.log(err);
})


    //console.log(postlist);
});

app.get("/about", function(req,res){
  res.render("about",{text2:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact",{text3:contactContent});
});
app.get("/compose", function(req,res){
  res.render("compose");
});

app.get("/posts/:postId",function(req,res){
  const postID=req.params.postId;
  Post.findOne({_id: postID}).then(function(post){
    res.render("post",{title:post.title, content:post.content})
  }).catch(function(err){
    console.log(err);
  })
  // for (var i=0;i<postlist.length;i++){
  //   if(dash.lowerCase(postName)== dash.lowerCase(postlist[i].Title)){
  //     console.log("match found");
  //     res.render("post",{title:postlist[i].Title, content:postlist[i].PostContent})
  //   }
  //
  // }

})

app.post("/compose",function(req,res){

// const NewPost={Title:req.body.newtext,
// PostContent:req.body.postBody};
// postlist.push(NewPost)

const post = new Post ({
   title: req.body.newtext,
   content: req.body.postBody
 });
 post.save();
console.log("hi");

  res.redirect("/");
});

let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
