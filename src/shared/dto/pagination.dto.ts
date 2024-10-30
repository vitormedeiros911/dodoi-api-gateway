import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class PaginationDto {
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
