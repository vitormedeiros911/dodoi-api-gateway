import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { EnderecoDto } from '../../shared/dto/endereco.dto';

export class CriarFarmaciaDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(100)
  @ApiProperty()
  nome: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  urlImagem: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  cnpj: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  razaoSocial: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: EnderecoDto,
  })
  endereco: EnderecoDto;
}
