import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  //* @IsEmail valida que el campo sea un email
  //* @IsNotEmpty valida que el campo no esté vacío
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  //* @IsNumber valida que el campo sea un número
  //* @Max(100) valida que el campo no sea mayor a 100
  /* @IsNumber()
  @Max(100)
  age: number; */
}
