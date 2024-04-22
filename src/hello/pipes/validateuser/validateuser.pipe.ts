import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateuserPipe implements PipeTransform {
  transform(value: any) {
    const ageNumber = parseInt(value.age.toString(), 10);

    if (isNaN(ageNumber)) {
      //* 'HttpException()' es una excepción que se utiliza para devolver una respuesta HTTP con un código de estado
      //* y un mensaje personalizado.
      //* 'HttpStatus' es un enumerador que contiene todos los códigos de estado HTTP.
      throw new HttpException('Age must be a number', HttpStatus.BAD_REQUEST);
    }

    return {
      ...value,
      age: ageNumber,
    };
  }
}
