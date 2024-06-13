import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

import { IEndereco } from '../interfaces/endereco.interface';

export class EnderecoDto implements IEndereco {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  logradouro: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  numero: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  complemento: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  bairro: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  cidade: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty()
  uf: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  cep: string;
}
