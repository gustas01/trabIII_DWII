import { IsEmail, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @MaxLength(30, {
    message: 'O primeiro nome deve ter no máximo $constraint1 caracteres',
  })
  firstName: string;

  @IsString()
  @MaxLength(30, {
    message: 'O sobrenome nome deve ter no máximo $constraint1 caracteres',
  })
  lastName: string;

  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
      minLowercase: 1,
    },
    {
      message:
        'A senha deve conter pelo menos 8 caracteres, sendo eles no mínimo 1 maiúsculo, 1 maiúsculo, 1 símbolo e 1 número',
    },
  )
  password: string;
}
