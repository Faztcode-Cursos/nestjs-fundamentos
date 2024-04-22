import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  //* CanActivate es una interfaz que se utiliza para implementar la lógica de autorización.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //* context.switchToHttp().getRequest() devuelve la solicitud HTTP actual.
    const request = context.switchToHttp().getRequest() as Request;
    // console.log(request.url);

    //* Si no hay un encabezado de autorización en la solicitud, devuelve false.
    if (!request.headers['authorization']) return false;

    return true;
  }
}
