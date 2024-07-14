import {Task} from "./task";

let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') ?? '[]');

const taskList = document.querySelector<HTMLUListElement>('ul.tasks');

tasks.forEach(renderTask);

function renderTask(task: Task){
    const spanElem = document.createElement('span');
    spanElem.innerText = task.description;

    const checkElem = document.createElement('input');
    checkElem.type = "checkbox";
    checkElem.checked = task.done;
    checkElem.addEventListener('change', () => {
        task.done = !task.done;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    const labelElem = document.createElement('label'); 
    labelElem.appendChild(checkElem);
    labelElem.appendChild(spanElem);

    const btnElem = document.createElement('button');
    btnElem.innerText = 'Remove';
    btnElem.className = 'btn btn-primary';  

    const taskElem = document.createElement('li', );
    taskElem.className = "list-group-item";
    taskElem.appendChild(labelElem);
    taskElem.appendChild(btnElem);
    taskList?.appendChild(taskElem);

    btnElem.addEventListener('click', () => {
        taskList?.removeChild(taskElem);
        const index = tasks.findIndex(x=> x.id === task.id);
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
}

function addTask(task: Task):void {
    task.id = tasks.length;
    tasks.push(task);    
}

const taskForm = document.querySelector('form.task')! as HTMLFormElement;
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const descriptionElem = document.querySelector<HTMLInputElement>('input.task')!;
    if (descriptionElem.value){
        const task = { id:0, description: descriptionElem.value, done: false };
        renderTask(task);
        addTask(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        descriptionElem.value = "";
        return;
    }
    alert('Please enter a task description');    
});