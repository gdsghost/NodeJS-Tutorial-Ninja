const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');


//express app
const app = express();

//connect to mongoDB
const dbURL = 'mongodb+srv://sudam:test123@nodetute.nnrrx.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine','ejs');

// middleware & static files - loading stylesheet
app.use(express.static('public'));

// 3rd party middleware
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req,res)=>{
    const blog = new Blog({
        title:'new blog 2',
        snippet: "about my new blog 2",
        body:'more about my new blog 2'
    });

    blog.save()
       .then((result)=>{
           res.send(result)
       })
       .catch((err) => {
           console.log(err);
       })
});

app.get('/all-blogs',(req,res) => {
    Blog.find()
      .then((result) => {
          res.send(result);
      })
      .catch((err) => {
          console.log(err);
      });
});

app.get('/single-blog', (req,res)=>{
    Blog.findById('60ba3c94c712412e3c95f8f3')
     .then((result) => {
         res.send(result)
     })
     .catch((err) => {
         console.log(err);
     })
})


//routes
app.get('/',(req,res) => {
    const blogs = [
        {title:'Getting started with AR', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae.'},
        {title:'Getting started with VR', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae.'},
        {title:'Getting started with .Net', snippet: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae.'}
    ];
    //res.send('<p>Home Page</p>');
    res.render('index',{title:'Home', blogs});
});

app.get('/about',(req,res) => {
    //res.send('<p>About Page</p>');
    res.render('about',{title:'About'});
});


app.get('/blog/create',(req,res) => {
    res.render('create',{title:'Create'});
});


// 404 page
app.use((req,res) => {
    res.status(404).render('404',{title:'404'});
});
