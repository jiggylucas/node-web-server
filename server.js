const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view page', 'hbs');
app.use(express.static(__dirname + '/public'));



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable toappend go server.log')
    }
  })
  next();
})

app.use((req, res, next) => {
  res.render('maintenence.hbs', {
    
  })
})

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome brethren!'

  })
})
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'ur mum gay'
  })
})
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About this page',
    aboutPage: 'This page is about your mom!'

  })
})
app.listen(3000, () => {
  console.log('successfully hosting on port 3000')
});
