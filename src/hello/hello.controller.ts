import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';

import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller('')
export class HelloController {
  //? @Req() y @Res() son decoradores que inyectan los objetos Request y Response de Express en el controlador.
  //* @Req() se utiliza para obtener la solicitud HTTP actual.
  //* @Res() se utiliza para enviar una respuesta HTTP.
  @Get('/hello')
  index(@Req() request: Request, @Res() response: Response) {
    console.log(request.url);
    response.status(200).json({
      message: 'Hello World',
    });
  }

  @Get('new')
  @HttpCode(201)
  somethingNew() {
    return 'Something new';
  }

  //* @HttpCode() decorador se utiliza para establecer el código de estado de la respuesta HTTP
  @Get('notfound')
  @HttpCode(404)
  notFoundPage() {
    return '404 Not Found';
  }

  @Get('error')
  @HttpCode(500)
  errorPage() {
    return 'Error Route!!!';
  }

  @Get('ticket/:num')
  getNumber(@Param('num', ParseIntPipe) num: number) {
    return num + 14;
  }

  @Get('active/:status')
  isUserActive(@Param('status', ParseBoolPipe) status: boolean) {
    console.log(typeof status);
    return status;
  }

  //* ValidateuserPipe es un pipe personalizado que se utiliza para validar los datos de entrada de la solicitud.
  //* @UseGuards() se usa para aplicar guards a los controladores o rutas. Los guards se usan para proteger las rutas.
  @Get('greet')
  @UseGuards(AuthGuard)
  greet(@Query(ValidateuserPipe) query: { name: string; age: number }) {
    return `Hello ${query.name}, you are ${query.age} years old`;
  }
}
