var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    articleOne : {
            title :'Article one',
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
    articleTwo :{
        title :'Article two',
            heading:'article two',
            date:'02-02-00',
            content:` 
                        <p>
                            This is the content for my second article.This is the content for my second article.This is the content for my second article.
                        </p>
                        
                    `
            
            
            
            
            
            
            
                },
    articleThree :{
        
    }
};

function createTemplete (data){
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplete =`
     <html> 
        <head>
            
            <meta name=viewport content="width-device-width, initial-scale-1" />
            <link href="/ui/style.css" rel="stylesheet" />
           <title> ${title} </title>
            
        </head>
        <body>
            <div class="container">
                <a href="/">Home</a>
                ${heading}
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
       `
    
    ;
    return htmlTemplete;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
 
app.get('/article-one', function(req , res){
    res.send(createTemplete(articleOne));
});

app.get('/article-two', function(req , res){
    res.send(createTemplete(articleTwo));
});


app.get('/article-three', function(req , res){
    res.send(createTemplete(articleThree));
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


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
