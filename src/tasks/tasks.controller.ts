import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService) {}
    
    @Get()
    getAllTasks() {
        this.TasksService.getAllTasks();
    }
}