let todolist = (JSON.parse(localStorage.getItem("todos")) || []);

function display(){
let content = " ";
for(let i = 0; i < todolist.length; i++){
    content += `<p>${todolist[i]}
                <button onClick = "DeleteTodo(${i})">Delete</button>
                <button onClick = "EditTodo(${i})">Edit</button>
                <button onClick = "CopyTodo(${i})">Copy</button>
                </p>`
            }
            document.getElementById("js_text").innerHTML = `${content}`;
}

function addTodo() {
    let inputText = document.getElementById("input").value.trim();
    if (inputText) { // Check if input is not empty
        todolist.push(inputText);
        localStorage.setItem("todos", JSON.stringify(todolist));
        document.getElementById("input").value = ""; // Clear input field
        display();
    } else {
        alert("Please enter a valid todo item.");
    }
}

document.getElementById("input").addEventListener("keydown" , function (event){
    if(event.key == "Enter"){
        addTodo();
    }
});

function DeleteTodo(index){
    todolist.splice(index,1);
    localStorage.setItem('todos', JSON.stringify(todolist)); 
    display();
}
function EditTodo(index){
let inputtext = todolist[index];
const editinput = `<input value = "${inputtext}" type="text" onKeydown = "update(event , ${index})">`;
todolist[index] = editinput;
localStorage.setItem('todos',JSON.stringify(todolist));
display();
document.querySelector(`input[onkeydown="updateTodo(event, ${index})"]`).focus();
}
function update(event, index){
if(event.key == "Enter"){
    const newvalue = event.target.value;
    if(newvalue){
        todolist[index] = newvalue;
        localStorage.setItem('todos',JSON.stringify(todolist));
        display();
    }
}
}
function CopyTodo(index){
    navigator.clipboard.writeText(todolist[index]);
}


function deleteAllTodos() {
    todolist = [];
    localStorage.setItem("todos", JSON.stringify(todolist));
    display();
}


display();