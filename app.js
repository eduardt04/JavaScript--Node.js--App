const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const session = require('express-session')
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');
const http=require('http');

app.use('/resources', express.static(__dirname + "/resources"));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: false
}));

app.get('/', function(req,res) {
    res.render('html/register');
});

app.post('/', (req, res) => {
	var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let rawdata = fs.readFileSync('users.json');
    let jsfis = JSON.parse(rawdata);
    let user=jsfis.users.find(function(x){
      return (x.username==fields.username);
		});
    if(user) {
      console.log("Username already taken!");
      res.render('html/register', {error_message: true});
    }
    else {
    	jsfis.users.push({id:jsfis.lastId, username:fields.username, password:fields.password});
    	jsfis.lastId++;
      let data = JSON.stringify(jsfis);
      fs.writeFileSync('users.json', data);
    	res.redirect('/login');
    }
  });
});

app.get('/login', function(req, res) {
  res.render("html/login");
})

app.post('/login', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
    let rawdata = fs.readFileSync('users.json');
    let jsfis = JSON.parse(rawdata);
		let user=jsfis.users.find(function(x){
      return (x.username==fields.username&& x.password == fields.password);
		});
		if(user){
			req.session.username=user;
      res.render('html/homepage', {user: req.session.username});
		}
    else {
      res.render('html/login', {error_message: true});
    }
	});
});

app.get('/logout', function(req, res) {
	req.session.destroy();
	res.render('html/logout');
});

app.get("/home", function(req, res) {
  res.render("html/homepage", {user: req.session.username});
});

app.get('/alg', function(req, res) {
	let rawdata = fs.readFileSync('algorithms.json');
	let jsfis = JSON.parse(rawdata);
  res.render('html/algorithms', {algorithms:jsfis.algorithms, user: req.session.username});
});


app.get("/*",function (req, res, next) {
  res.render(__dirname+"html/"+req.path,  function(err, html) {
      if (err) {
          if (err.message.indexOf('Failed to lookup view') !== -1) {
              return res.status(404).render('html/404');
          }
          throw err;
      }
      res.send(html);
  });
});

app.listen(8080);
console.log("A pornit micutu");
