const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}, ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to register this log');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   if (req.url === '/maintenance') {
//     res.render('maintenance.hbs', {
//       title: 'Maintenance'
//     });
//   }
//   else {
//     next();
//   }
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    title: 'Homepage',
    message: 'Welcome Fady'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    title: 'Projects Portfolio'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error retrieving page'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
