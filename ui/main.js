/*console.log('Loaded!');

//change the text of main-text div

var element=document.getElementById("main-text");

element.innerHTML="New Value";


//move the image

var img=document.getElementById("madi");
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 5;
    img.style.marginLeft = marginLeft + "px";
}
img.onclick=function(){
    var interval = setInterval(moveRight,50);
    
};*/

//Button counter code

var button = document.getElementById("counter");
var counter=0;
button.onclick=function(){
  // Create a request object
  var request = new XMLHttpRequest();
  
  //Capture the response and store it in a variable
  request.onreadystatechange = function(){
    if(request.readystate === XMLHttpRequest.DONE)
    {
        //take some action
        if(request.status === 200)
        {
            var counter = request.responseText;
            var span = document.getElementById("count");
            span.innerHTML = counter.toString();
        }
    }
    // else do not take any action
  };
  
  // Make a request
  request.open ('GET' , 'http://http://poojakhandhadia.imad.hasura-app.io/counter' , true);
  request.send(null);
};
