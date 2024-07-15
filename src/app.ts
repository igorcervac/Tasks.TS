import {Task} from "./task.js";
import { service } from "./local-storage-service.js"

service.getAll().forEach(renderTask);

const taskForm = document.querySelector('form.task')! as HTMLFormElement;
taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const descriptionElem = document.querySelector<HTMLInputElement>('input.task')!;
    if (descriptionElem.value){
        const task = { id: 0, description: descriptionElem.value, done: false };
        renderTask(task);
        service.create(task);
        descriptionElem.value = "";
        return;
    }
    alert('Please enter a task description');    
});

function renderTask(task: Task){
    const taskList = document.querySelector<HTMLUListElement>('ul.tasks');

    const spanElem = document.createElement('span');
    spanElem.innerText = task.description;

    const checkElem = document.createElement('input');
    checkElem.type = "checkbox";
    checkElem.checked = task.done;
    checkElem.addEventListener('change', () => {
        task.done = !task.done;
        service.update(task);
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
        service.delete(task.id);
    });
}