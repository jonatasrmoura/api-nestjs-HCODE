import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  birthAt: Date;

  @IsOptional()
  @IsEnum(Role)
  role: number;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
    minLowercase: 1,
  })
  password: string;
}
