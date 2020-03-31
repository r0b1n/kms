(function() {
storageTodo = getStorageTodo();

function renderTodo(todo) {
    let labelEl = document.createElement("label");
    labelEl.innerHTML = "";
    labelEl.dataset.todoId = todo.id;

    let checkboxEl = document.createElement("input");
    checkboxEl.setAttribute("type", "checkbox");
    checkboxEl.setAttribute("id", todo.id);
    if (todo.check == true) {
        checkboxEl.setAttribute("checked", "");
        labelEl.style.textDecoration = "line-through";
    } else {
        labelEl.style.textDecoration = "none";
    }
    checkboxEl.onclick = onclickTodoCheck;
    labelEl.append(checkboxEl);
    labelEl.append(todo.title);

    let buttonEl = document.createElement("button");
    buttonEl.dataset.todoId = todo.id;
    buttonEl.innerHTML = "x";
    buttonEl.onclick = onclickTodoDelete;
    labelEl.append(buttonEl);
    labelEl.append(document.createElement("br"));

    return labelEl;
}

function renderList(todoList) {
    let outElement = document.getElementById("out");
    outElement.innerHTML = "";
    for (let key in todoList) {
        let todo = todoList[key];
        outElement.append(renderTodo(todo));
    }
}

function onclickTodoCheck(e) {
    let todoId = e.target.id;
    console.log(todoId);
    let todo = storageTodo.getTodoById(todoId);
    let labelElement = document.getElementById(todoId).parentElement;
    todo.check = !todo.check;
    renderList(storageTodo.list);
    storageTodo.changeCheckTodoById(todoId, todo.check);
}

function onclickTodoDelete(e) {
    let todoId = e.target.dataset.todoId;
    console.log(todoId);
    storageTodo.deleteTodoById(todoId);
    renderList(storageTodo.list);
}

window.onload = function() {
    renderList(storageTodo.getListTodo());

    document.getElementById("add").onclick = function() {
        let title = document.getElementById("in").value;
        let todo = new Todo(storageTodo.generateNewId(), title, false);
        storageTodo.addTodo(todo);
        renderList(storageTodo.getListTodo());
    };
};
}) ();
