import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { StatusEnum } from 'src/shared/enum/status.enum';

import { CategoriaEnum } from '../enum/categoria.enum';

export class ProdutoDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(100)
  @ApiProperty()
  nome: string;

  @IsString()
  @MaxLength(500)
  @ApiProperty()
  descricao: string;

  @IsString()
  @IsUrl()
  @ApiPropertyOptional()
  urlImagem: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  precoUnitario: number;

  @IsEnum(StatusEnum)
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ enum: StatusEnum })
  status: StatusEnum;

  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  idFarmacia: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  quantidadeDisponivel: number;

  @IsEnum(CategoriaEnum)
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({ enum: CategoriaEnum })
  categoria: CategoriaEnum;
}
