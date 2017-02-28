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
    if(request.readyState === XMLHttpRequest.DONE)
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
  request.open ('GET' , 'http://poojakhandhadia.imad.hasura-app.io/counter' , true);
  request.send(null);
};

// Submit Name

var submit = document.getElementById("submit_btn");
submit.onclick = function() {
    // Make a request to the server and send the name
   
   // Create a request object
  var request = new XMLHttpRequest();
  
  //Capture the response and store it in a variable
  request.onreadystatechange = function(){
    if(request.readyState === XMLHttpRequest.DONE)
    {
        //take some action
        if(request.status === 200)
        {
            var names= request.responseText; // getting a string n need to be converted to object
            names = JSON.parse(names); // converting string to array/obj
    var list = '';
    for(var i=0 ; i<names.length ; i++)
    {
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;        }
    }
    // else do not take any action
  };

    var nameInput = document.getElementById("name");
    var name1 = nameInput.value;  
  // Make a request
  request.open ('GET' , 'http://poojakhandhadia.imad.hasura-app.io/submit-name?name=' +name1, true);
  request.send(null);
}; 
    // Capture a list of names and render it as a list