import { Task } from "./task.js";
import { IService } from "./service.js";

class LocalStorageService implements IService {

    getAll(): Task[]{
        return JSON.parse(localStorage.getItem('tasks') ?? '[]');
    }

    create(task: Task){
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        task.id = tasks.length + 1;
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    update(task: Task): void {
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        const taskToUpdate = tasks.find((x: Task) => x.id === task.id)!;
        taskToUpdate.done = task.done;
        console.log(taskToUpdate);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    delete(id: number): void {
        const tasks = JSON.parse(localStorage.getItem('tasks') ?? '[]');
        const index = tasks.findIndex((x: Task) => x.id === id);
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

export const service = new LocalStorageService();
