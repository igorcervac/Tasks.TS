import { Task } from "./task.js";

export interface IService {
    getAll(): Task[];
    create(task:Task): void;
    update(task:Task): void;
    delete(id:number): void;
}