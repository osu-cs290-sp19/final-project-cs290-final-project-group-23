var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var twitNumber;

var sororityPhotos = require('./sororityPhotos');
var activePhotos = require('./activePhotos');

var app = express();
var port = process.env.PORT || 3000;



app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function(req, res, next){
    res.status(200).render('homepage');
});

app.get('/:type', function(req, res, next){
  var page = req.params.type.toLowerCase();
  if(page == "active"){
    //don't let the button be displayed on this page
    res.status(200).render('photoPageActives', sororityPhotos[page]);
  }
  else if(sororityPhotos[page]){
    res.status(200).render('photoPages', sororityPhotos[page]);
  }
  else if(activePhotos[page]){
    res.status(200).render('photoPages', activePhotos[page]);
  }
  else if(page == "about"){
    res.status(200).render('aboutPage');
  }
  else{
    next();
  }
});

app.get('/active/:type', function(req, res, next){
  var page = req.params.type.toLowerCase();
  if(activePhotos[page]){
    res.status(200).render('photoPages', activePhotos[page]);
  }
});


app.get('*', function (req, res, next) {
  res.status(404).render('404');
});

app.listen(port, function (err) {
  if(err){
    throw err;
  }
  console.log("== Server is listening on port", port);
});
