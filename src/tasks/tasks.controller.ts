import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) {}
    
    @Get()
    getAllTasks(): Task[] {
        return this.TasksService.getAllTasks();
    }
}
