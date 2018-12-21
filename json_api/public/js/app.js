/* global $ todo */ 

$(document).ready(function(){ //jquery init
    
    $.getJSON('/api/todos') //grabs all JSON from API to display
    .then(addTodos); //displays JSON from API - function defined below
    
    //add item with enter, when typed
    
    $("#todoInput").keypress(function(press){ //keypress event listener
        if(press.which == 13){ // if "enter/return" is pressed - #13
            //create new todo
            createTodo(); //function defined below
        }
        
    });
    
    //update toggle item when completed, not completed

    $('.list').on('click', 'li', function(){
        updateTodo($(this));
        
    });
    
    //Deleting item from list
    
    $('.list').on('click', 'span', function(event){ //get list class, add click event only on span
       event.stopPropagation(); //stops the code from running both functions of delete and update on span item
       removeTodo($(this).parent()); //calls remove function defined below 
       
    });
    
    }); //end jquery init
    
    
function updateTodo(todo){
    
       var updateClick = todo.data('id'); 
       var updateUrl = '/api/todos/' + updateClick; //concat's the api url + mongo ._Id value
       var isDone = !todo.data('completed');
       var updateData = ({completed: isDone});
      
        $.ajax({       //jquery AJAX call
            method: 'PUT', // Delete Method
            url: updateUrl, // var assigned above
            data: updateData
        })
        .then(function(updatedTodo){
            
            todo.toggleClass('done');
            todo.data("completed", isDone);
        })
        
        .catch(function(err){
           console.log(err);
           
        });
}


function removeTodo(todo){
    
       var clickedId = todo.data('id'); 
       var deleteUrl = '/api/todos/' + clickedId; //concat's the api url + mongo ._Id value
      
        $.ajax({       //jquery AJAX call
            method: 'DELETE', // Delete Method
            url: deleteUrl // var assigned above
        })
        .then(function(data){
            
            todo.remove(); //removes element from DOM
        })
        
        .catch(function(err){
           console.log(err);
           
        });
    
}

function addTodos(todos){  //runs a loop through all JSON from API and stages it for display
    
    todos.forEach(function(todo){
        addTodo(todo);
        
        
    });
    
}

function addTodo(todo){ //adds a single item from the input field
    
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>'); //assigns structure of list item to var
        newTodo.data('id', todo._id); // adds a data attribute to list item from mongo ID
        newTodo.data('completed', todo.completed); // adds a data attribute of completed status from API
        if(todo.completed){ //complete = true
            
            newTodo.addClass('done'); //only if completed - add the class of "done", referencing the stylesheet 
        }
        $('.list').append(newTodo); //add list item to end of list from items above if statement
}

function createTodo(){
    
    var userInput = $('#todoInput').val(); //assigns the value of the input field to var
    $.post("/api/todos", {name: userInput}) //sends a post request to api url with JSON object of the model
    .then(function(returnedTodo){ //then, run a function that grabs the returned value from API
        $('#todoInput').val(''); //grab the empty value from input field
       addTodo(returnedTodo); //add the returned info into in, based on addTodo function defined above
    })
    
    .catch(function(err){ //if there's a error, 
        console.log(err); // put that error in the console
    });
}