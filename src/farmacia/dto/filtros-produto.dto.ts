import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../../shared/dto/pagination.dto';
import { StatusEnum } from '../../shared/enum/status.enum';

export class FiltrosFarmaciaDto extends PaginationDto {
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
}
