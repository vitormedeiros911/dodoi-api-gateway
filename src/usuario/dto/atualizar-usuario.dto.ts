import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
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
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  urlImagem: string;

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
