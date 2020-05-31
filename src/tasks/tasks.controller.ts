import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './dto/create-task-dto';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) {}
    
    @Get()
    getAllTasks(): Task[] {
        return this.TasksService.getAllTasks();
    }

    @Post()
    createTask(@Body() CreateTaskDTO: CreateTaskDTO): Task {
        return this.TasksService.createTask(CreateTaskDTO);
    }
}
