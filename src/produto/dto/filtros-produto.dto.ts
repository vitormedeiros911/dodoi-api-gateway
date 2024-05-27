import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class FiltrosProdutoDto {
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  nome: string;

  @IsNumberString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  skip: number;

  @IsNumberString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  limit: number;
}
