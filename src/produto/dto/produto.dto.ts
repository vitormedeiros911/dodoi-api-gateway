import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { StatusEnum } from 'src/shared/enum/status.enum';

export class ProdutoDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @MaxLength(100)
  @ApiProperty()
  nome: string;

  @IsString()
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

  @IsEnum(StatusEnum)
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ enum: StatusEnum })
  status: StatusEnum;
}
