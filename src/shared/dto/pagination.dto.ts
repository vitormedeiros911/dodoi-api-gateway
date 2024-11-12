import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ default: 0 })
  @Transform((value) => parseInt(value.value, 10))
  skip: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ default: 10 })
  @Transform((value) => parseInt(value.value, 10))
  limit: number;
}
