const inputText = document.getElementById('input');
const inputButton = document.getElementById('btn-input');
const list = document.getElementById('items-list');

inputButton.addEventListener('click', (e) => {
    if(inputText.value != "") {
        addTask(inputText.value);
    } else {
        alert('Fill the input field in you want to add something!');
    }
});



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


deleteTask = (element) => {
    element.parentElement.remove();
}

markAsDone = (element) => {
    lastItemInClassList = element.parentElement.classList[element.parentElement.classList.length - 1];
    if (lastItemInClassList !== 'checked') {
        console.log('checked added');
        element.parentElement.classList.add('checked');
    } else {
        console.log('checked removed');
        element.parentElement.classList.remove(element.parentElement.classList[1]);
    }
}

list.addEventListener('click', (event) => {
    switch (event.target.className) {
        case 'check':
            //mark item done
            markAsDone(event.target);
            break;
        case 'task-text':
            //edit
            break;
        case 'trash':
            deleteTask(event.target);
            break;
    }
})