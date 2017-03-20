var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser = require('body-parser');

var config = {
    user : 'poojakhandhadia',
    database : 'poojakhandhadia',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password :'db-poojakhandhadia-6092'// DB_PASSWORD is an enviornment variable,cz if we enter the password here anyone can see it
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


/*var articles = {
    'article-one' : {
            title :'Article one | Pooja Khandhadia',
            heading:'article one',
            date:'01-01-00',
            content:` 
                        <p>
                            This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                        </p>
                        <p>
                            This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                        </p>
                        <p>
                            This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.This is the content for my first article.
                        </p>
                    `
                },
    'article-two' : {
            title :'Article two | Pooja Khandhadia',
            heading:'article two',
            date:'02-02-00',
            content:` 
                        <p>
                            This is the content for my second article.This is the content for my second article.This is the content for my second article.
                        </p>
                    `
                },
    'article-three' : {
            title :'Article three | Pooja Khandhadia',
            heading:'article three',
            date:'02-02-00',
            content:` 
                        <p>
                            This is the content for my third article.This is the content for my third article.This is the content for my third article.
                        </p>
                    `
                }

   
};*/

function createTemplete (data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplete =
     `<html> 
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="/ui/style.css" rel="stylesheet" />
           <title> ${title} </title>
        </head>
        <body>
            <div class ="container">
                <a href="/">Home</a>
                ${heading}
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>`;
    return htmlTemplete;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
  // How to create a hash ?
  var hashed = crypto.pbkdf2Sync(input , salt , 10000 , 512 , 'sha512');
  return hashed.toString('hex');
}

app.get('/hash/:input' , function(req,res){
  var hashedString = hash(req.params.input , 'this-is-a-random-string');
  res.send(hashedString);
});

app.post('/create-user', function (req, res) {
   // username, password
   // {"username": "tanmai", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created: ' + username);
      }
   });
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                
                
                res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

var pool = new Pool(config);
app.get('/test-db', function(req,res){
   // make a select request
   //return a response with the results
   pool.query('SELECT * from test',function(err, result){
      if(err){
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result.rows));
      }
   });
});

var counter = 0;
app.get('/counter' , function(req , res){
   counter = counter + 1;
   res.send(counter.toString());
});
app.get('/articles/:articleName', function(req , res){
	// articleName = article-one
	//articles[articleName] = {} content of article-one
	pool.query("SELECT * from article WHERE title = $1",[ req.params.articleName] ,function(err,result){

		if(err){
			res.status(500).send(err.toString());
		}
		else{
			if(result.rows.length == 0){
				res.status(404).send('Article one not found');
			}
			else{
				var articleData = result.rows[0];
				res.send(createTemplete(articleData));
			}
		}
	});
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names = [];
app.get('/submit-name' , function (req , res){
   //Get the name from the request
   var name = req.query.name;
   names.push(name);
   
   //JSON javascript object notation. It is a way to convert javascript objects into strings.
   res.send(JSON.stringify(names)); // we change this array into string cz res.send can only send srtings
});
var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
