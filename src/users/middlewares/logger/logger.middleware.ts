import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

//* NestMiddleware es una interfaz que define un método use() que toma tres argumentos: req, res y next.
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  //* El método use() se llama cada vez que se recibe una solicitud HTTP.
  use(req: Request, res: Response, next: () => void) {
    console.log('middleware:', req.originalUrl);
    next();
  }
}
