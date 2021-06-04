const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine
app.set('view engine','ejs');

//listen to requests
app.listen(3000);

// middleware & static files - loading stylesheet
app.use(express.static('public'));

// 3rd party middleware
app.use(morgan('dev'));

//Custome middlewear
app.use((req,res,next) => {
    console.log('new request made:');
    console.log('host:',req.hostname);
    console.log('path:',req.path);
    console.log('method:',req.method);
    next();
});

// another custom middleware
app.use((req,res,next) => {
    console.log('in the next middleware');
    next();
});

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
