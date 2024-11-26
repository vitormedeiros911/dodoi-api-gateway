import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

import { EnderecoDto } from '../../shared/dto/endereco.dto';

export class AtualizarUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(14)
  cpf: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  dataNascimento: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  telefone: string;

  @IsNotEmpty()
  @ApiProperty({
    type: EnderecoDto,
  })
  endereco: EnderecoDto;
}
