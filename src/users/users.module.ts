import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { PrismaService } from './prisma.service';

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
})
//* NestModule permite configurar middlewares para un módulo específico
export class UsersModule implements NestModule {
  //* El método configure() se llama con un objeto MiddlewareConsumer que proporciona un método apply() que
  //* se puede usar para configurar middlewares.
  //* apply() toma un middleware y una ruta. En este caso, el middleware LoggerMiddleware se aplica a la
  //* ruta 'users' que haga una peticion GET. Y el middleware AuthMiddleware se aplica a la ruta 'users'
  //* para todas las peticiones http.
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'users',
          method: RequestMethod.POST,
        },
      )
      .apply(AuthMiddleware)
      .forRoutes('users');
  }
}
