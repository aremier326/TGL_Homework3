// DOM elements.

const inputText = document.getElementById('input');
const inputButton = document.getElementById('btn-input');
const list = document.getElementById('items-list');

// task add with some additional verification.
const addTaskChecked = (e) => {
    if(inputText.value != "") {
        addTask(inputText.value);
    } else {
        alert('Fill the input field in you want to add something!');
    }
}

// Method for adding task.
const addTask = (text) => {
    //li tag
    const toDoItemLi = document.createElement('li');
    toDoItemLi.classList.add('to-do-item');
    //check button
    const checkButton = document.createElement('button');
    checkButton.classList.add('check');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    //text
    const pText = document.createElement('p');
    pText.classList.add('task-text');
    pText.innerText = text;
    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('trash');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    //appending elements
    toDoItemLi.appendChild(checkButton);
    toDoItemLi.appendChild(pText);
    toDoItemLi.appendChild(deleteButton);
    list.appendChild(toDoItemLi);

    inputText.value = "";
}

// Method for interacting with task nodes.
const taskActions = (e) => {
    switch (e.target.className) {
        case 'check':
            // mark item as done.
            markAsDone(e.target);
            break;
        case 'task-text':
            // edit
            if (!isChecked(e.target)) {
                showInputEditor(e.target);
            }
            break;
        case 'trash':
            // delete task.
            deleteTask(e.target);
            break;
    }
}

// Method for deleting task.
const deleteTask = (element) => {
    element.parentElement.remove();
}

// Method for marking task as done.
const markAsDone = (element) => {
    const list = element.parentElement.classList;
    if (!isChecked(element)) {
        console.log('checked added');
        list.add('checked');
    } else {
        console.log('checked removed');
        list.remove(list[list.length - 1]);
    }
}

// Temp value for storing preedited text.
let initialNode;

// Method for editing text in task.
const showInputEditor = (element) => {
    const parent = element.parentNode;
    initialNode = element;
    const itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.value = element.innerHTML;
    itemInput.classList.add('inputEdit');
    
    parent.replaceChild(itemInput, element);
    itemInput.select();

    itemInput.addEventListener('click', saveItem);
    itemInput.addEventListener('focusout', saveItem);
}

// Method for saving item during or after edit.
const saveItem = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 0) {
        const pText = document.createElement('p');
        pText.classList.add('task-text');
        pText.innerText = inputValue;
        e.target.parentNode.replaceChild(pText, e.target);
    } else {
        e.target.parentNode.replaceChild(initialNode, e.target);
    }
}

// Additional method for check if the task is marked as done.
const isChecked = (element) => {
    lastItemInClassList = element.parentElement.classList[element.parentElement.classList.length - 1];
    return lastItemInClassList === 'checked';
}

// Events

inputButton.addEventListener('click', addTaskChecked);
list.addEventListener('click', taskActions)
