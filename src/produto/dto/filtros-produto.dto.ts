import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { StatusEnum } from '../../shared/enum/status.enum';

export class FiltrosProdutoDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  nome: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StatusEnum, { each: true })
  @ApiPropertyOptional({ enum: StatusEnum, isArray: true })
  status: string[];

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
