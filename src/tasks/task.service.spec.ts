import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { userInfo } from 'os';
import { NotFoundException } from '@nestjs/common';

const mockUser = { username: 'Test user',id: 12 };

// mock functions
const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne : jest.fn(),
    createTask: jest.fn(),
    deleteTask: jest.fn,
});

// tests
describe('TasksService', () => {
    let tasksService;
    let taskRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService, 
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue('some value');

            expect(taskRepository.getTasks).not.toHaveBeenCalled();

            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some search query' };
            const result = await tasksService.getTasks(filters, mockUser);
            tasksService.getTasks(filters, mockUser);

            expect(taskRepository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('some value');

        });
    });

    describe('getTaskById', () => {
        it('calls taskRepository.findOne() and successfully retrieves the task', async () => {
            const mockTask = { title: 'Test task', description: 'Test description' }
            taskRepository.findOne.mockResolvedValue(mockTask);

            const result = await tasksService.getTaskById(1, mockUser);
            expect(result).toEqual(mockTask)

            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 1,
                    userId: mockUser.id,
                },
            })
        });

        it('throws an error as task is not found', () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
        })
    });

    // describe('createTask', () => {
    //     const filters: CreateTaskDto = { title: 'test create task title', description: 'test description' };
        
    //     it('calls taskRepository.createTask() and successfully returns task', async () => {
    //         taskRepository.createTask.mockResolvedValue('some task'); 

    //         expect(taskRepository.createTask).not.toHaveBeenCalled();
           
    //         const result = await tasksService.createTask(filters, mockUser);

    //         expect(tasksService.createTask).toHaveBeenCalledWith(filters, mockUser);
    //         expect(result).toEqual('some task');
    //     });

    //     it('throws an error as user not found', async() => {
    //         taskRepository.createTask(filters, null);
    //         expect(tasksService.createTask(filters, null)).rejects.toThrow();
    //     });
    // });

    // describe('deleteTask', () => {
    //     it('calls taskRepository.deleteTask() to delete a task', async () => {
    //         taskRepository.delete.mockResolvedValue({ affected: 1 });
    //         expect(taskRepository.delete).not.toHaveBeenCalled();
    //         await tasksService.deleteTask(1, mockUser);
    //         // expect(taskRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id });            
    //         expect(taskRepository.delete).toHaveBeenCalled();            

    //     });

        // it('throws an error as task can not be found', () => {
        //     taskRepository.deleteTask.mockResolvedValue({ affected: 0 });
        //     expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
        // });

    // });

    describe('updateTaskStatus', () => {
        it('updates task status', async () => {
            const save = jest.fn().mockResolvedValue(true);

            tasksService.getTaskById = jest.fn().mockResolvedValue({ // use mockResolvedValue where we have "await" in original function
                status: TaskStatus.OPEN,
                save,
            });

            expect(tasksService.getTaskById).not.toHaveBeenCalled();
            const result = await tasksService.updateTaskStatus(1, TaskStatus.DONE, mockUser);
            expect(tasksService.getTaskById).toHaveBeenCalled();
            expect(tasksService.getTaskById)
            expect(save).toHaveBeenCalled();
            expect(result.status).toEqual(TaskStatus.DONE);
        });

    });
});