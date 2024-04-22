import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

//* @ApiTags permite agregar una etiqueta aa controlador para organizar la documentación de la API(sus endpoints).
@Controller('/tasks')
@ApiTags('tasks')
export class TasksController {
  tasksService: TasksService;

  constructor(tasksService: TasksService) {
    this.tasksService = tasksService;
  }

  //* @Query permite acceder a los parámetros de la URL(query strings)
  //* @ApiOperation permite agregar una descripción a un endpoint.
  //* @ApiResponse permite agregar una respuesta a un endpoint y su codigo de respuesta.
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getAllTasks(@Query() query: any) {
    console.log(query);
    return this.tasksService.getTasks();
  }

  //* @Param permite acceder a los parámetros de la URL(rutas dinámicas o parametro amigable)
  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.tasksService.getTask(parseInt(id));
  }

  //* @Body permite acceder al cuerpo de la petición
  //* @UsePipes permite aplicar validaciones a los datos que se reciben
  //* ValidationPipe es una clase que permite validar los datos que se reciben del DTO
  @Post()
  // @UsePipes(new ValidationPipe())
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Put()
  updateTask(@Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(task);
  }

  @Delete()
  deleteTask() {
    return this.tasksService.deleteTask();
  }

  @Patch()
  updateTaskStatus() {
    return this.tasksService.updateTaskStatus();
  }
}
