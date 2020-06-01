import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto) {
    //     const { status, search } = filterDto;

    //     let tasks = this.getAllTasks();
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search))
    //     }

    //     return tasks;
    // }

    getTaskById(id: number) {
        const found =  this.taskRepository.findOne(id);
    }

    // getTaskByID(id: string): Task {
    //     const found = this.tasks.find(task => task.id == id);

    //     if (!found) {
    //         throw new NotFoundException(`Task with id ${id} not found :( )`);
    //     }

    //     return found;
    // }

    // createTask(CreateTaskDTO: CreateTaskDto): Task {
    //     const { title, description } = CreateTaskDTO;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     }; 
    //     this.tasks.push(task);
    //     return task;
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskByID(id);
    //     task.status = status;
    //     return task;
    // }

    // deleteTask(id: string): void {
    //     const found = this.getTaskByID(id);
    //     this.tasks = this.tasks.filter(task => task.id != found.id);
    // }
}
