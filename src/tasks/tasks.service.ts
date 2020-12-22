import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-taks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task: Task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuidv1(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus ): Task {
    const objIndex = this.tasks.findIndex((task: Task) => task.id === id);
    this.tasks[objIndex].status = status;
    return this.tasks[objIndex];
  }

  deleteTaskById(id: string): string {
    this.tasks = this.tasks.filter((task: Task) => task.id !== id);
    return 'Succesfully Deleted Task';
  }
}
