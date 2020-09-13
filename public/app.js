$(document).ready(function() {
    $.getJSON('/api/todos')
	.then(addTodos)


    $('#todoInput').keypress(function(event) {
		//keycode 13 = ENTER key
        if(event.which === 13) {
            console.log("ENTER KEY pressed: Adding new Todo Item!");
			createTodo();
        }
    });

//     $('.list').on('click', 'li', function() {
//         updateTodo($(this));
//     });

//     $('.list').on('click', 'span', function(e) {
//         e.stopPropagation();
//         removeTodo($(this).parent());
//     });
});

function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo) {
		console.log(todo.name);
        addTodoToList(todo);
    });
}

function addTodoToList(todo) {
    var todoItem = $('<li class="task">' + todo.name + '<span>X</span></li>');
    todoItem.data('id', todo._id);
    todoItem.data('completed', todo.completed);
    if(todo.completed) {
        todoItem.addClass('done');
    }
    $('.list').append(todoItem);
}

function createTodo() {
    //send request to create new todo
    var userInput = $('#todoInput').val();
	if (userInput===''){
		console.log('Cannot add empty string to Todo List!');
	} else {	
		console.log(userInput);
		$.post('/api/todos', { name: userInput })
		.then(function(newTodo) {
			$('#todoInput').val('');
			addTodoToList(newTodo);
		})
		.catch(function(err) {
			console.log(err);
		});	
	} 
}

function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data) {
        todo.remove();
    })
    .catch(function(err) {
        console.log(err);
    });
}

function updateTodo(todo) {
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = { completed: isDone };
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo) {
        todo.toggleClass('done', isDone);
        todo.data('completed', isDone);
    });
}

