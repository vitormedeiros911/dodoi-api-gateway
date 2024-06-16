import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class ProdutoDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(100)
  @ApiProperty()
  nome: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  descricao: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty()
  urlImagem: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  precoUnitario: number;
}
