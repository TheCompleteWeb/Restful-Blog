var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restful_blog_app');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created : 
        {type: Date, default : Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

/*Blog.create({
    title: 'Test blog',
    image: 'https://cdn.pixabay.com/photo/2018/05/07/10/49/husky-3380550__340.jpg',
    body : 'Hello This is a test dog post'
});*/

app.get('/', function(req, res){
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res){
    Blog.find({}, function(err, blogs){
        if(err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});    
        }
            
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server started!');
});
    