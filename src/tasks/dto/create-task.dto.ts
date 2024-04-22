import { IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  //* @IsString() valida que el valor sea un string
  //* @MinLength(1) valida que el valor tenga al menos 1 caracter
  @IsString()
  @MinLength(1)
  title: string;

  @MinLength(1)
  @IsString()
  description: string;
}
