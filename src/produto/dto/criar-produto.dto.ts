import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  urlImagem: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  precoUnitario: number;
}
