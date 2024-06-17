import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class FiltrosProdutoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  nome: string;

  @IsNumberString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  skip: number;

  @IsNumberString()
  @IsNotEmpty()
  @IsDefined()
  @ApiPropertyOptional({ default: 10 })
  limit: number;
}
