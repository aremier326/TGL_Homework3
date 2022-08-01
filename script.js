// DOM elements.

const inputText = document.getElementById('input');
const inputButton = document.getElementById('btn-input');
const list = document.getElementById('items-list');


// task add with some additional verification.
const addTaskChecked = (e) => {
    if(inputText.value != "") {
        task = {
            text: inputText.value,
            completed: false
        }
        saveNewToLocalStorage(task);
        printTask(task);

        inputText.value = "";
    } else {
        alert('Fill the input field in you want to add something!');
    }
}

// Method for adding task.
const printTask = (task) => {
    //li tag
    const toDoItemLi = document.createElement('li');
    toDoItemLi.classList.add('to-do-item');
    if (task.completed) {
        toDoItemLi.classList.add('checked');
    }
    //check button
    const checkButton = document.createElement('button');
    checkButton.classList.add('check');
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    //text
    const pText = document.createElement('p');
    pText.classList.add('task-text');
    pText.innerText = task.text;
    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('trash');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';

    //appending elements
    toDoItemLi.appendChild(checkButton);
    toDoItemLi.appendChild(pText);
    toDoItemLi.appendChild(deleteButton);
    list.appendChild(toDoItemLi);
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
    let task = getTaskFromEventElement(element);
    removeFromLocalStorage(task);
    element.parentElement.remove();
}

// Method for marking task as done.
const markAsDone = (element) => {
    const list = element.parentElement.classList;
    if (!isChecked(element)) {
        updateLocalStorage(getTaskFromEventElement(element), {text: element.parentNode.innerText, completed: true});
        list.add('checked');
    } else {
        updateLocalStorage(getTaskFromEventElement(element), {text: element.parentNode.innerText, completed: false});
        list.remove(list[list.length - 1]);
    }
    
}

// Temp value for storing preedited text.
let initialNode;
let initialNodeParent;

// Method for editing text in task.
const showInputEditor = (element) => {
    const parent = element.parentNode;
    const itemInput = document.createElement('input');
    itemInput.type = 'text';
    itemInput.value = element.innerHTML;
    itemInput.classList.add('inputEdit');
    initialNode = parent.replaceChild(itemInput, element);
    itemInput.select();
    itemInput.addEventListener('focusout', saveItem);
}

// Method for saving item during or after edit.
const saveItem = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 0 && inputValue !== initialNode.innerText) {
        const pText = document.createElement('p');
        pText.classList.add('task-text');
        pText.innerText = inputValue;
        e.target.parentNode.replaceChild(pText, e.target);
        updateLocalStorage({text: initialNode.innerText, completed: false}, {text: pText.innerText, completed: false});
    } else {
        e.target.parentNode.replaceChild(initialNode, e.target);
        
    }
}

// Additional method for check if the task is marked as done.
const isChecked = (element) => {
    lastItemInClassList = element.parentElement.classList[element.parentElement.classList.length - 1];
    return lastItemInClassList === 'checked';
}

// Method for getting task object from different elements of li.
const getTaskFromEventElement = (element) => {
    const task = {
        text: element.parentNode.innerText,
        completed: isChecked(element)
    }
    return task;
}


// Local Storage Save
const saveNewToLocalStorage = (item) => {
    let list;
    if (localStorage.getItem('list') === null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem('list'));
    }
    list.push(item);
    localStorage.setItem('list', JSON.stringify(list));
}

// Method for removing task from local storage.
const removeFromLocalStorage = (item) => {
    let list;
    if (localStorage.getItem('list') !== null) {
        list = JSON.parse(localStorage.getItem('list'));
    }

    index = list.findIndex(obj => {
        return obj.text === item.text && obj.completed === item.completed;
    });

    if (index > -1) {
        list.splice(index, 1);
    }

    localStorage.setItem('list', JSON.stringify(list));
}

// Method for updating object values in local storage.
const updateLocalStorage = (oldItem, newItem) => {
    let list;
    if (localStorage.getItem('list') !== null) {
        list = JSON.parse(localStorage.getItem('list'));
    }

    index = list.findIndex(obj => {
        return obj.text === oldItem.text && obj.completed === oldItem.completed;
    });

    list[index] = newItem;

    localStorage.setItem('list', JSON.stringify(list));
}

// Prints task list from the local storage.
const getTaskList = () => {
    let list;
    if (localStorage.getItem('list') !== null) {
        list = JSON.parse(localStorage.getItem('list'));
    }

    list.forEach(task => {
        printTask(task);
    });
}

// Events

document.addEventListener('DOMContentLoaded', getTaskList);
inputButton.addEventListener('click', addTaskChecked);
list.addEventListener('click', taskActions)