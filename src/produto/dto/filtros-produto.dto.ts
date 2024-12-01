import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PaginationDto } from '../../shared/dto/pagination.dto';
import { StatusEnum } from '../../shared/enum/status.enum';
import { OrderEnum } from '../../shared/enum/order.enum';
import { CategoriaEnum } from '../enum/categoria.enum';

enum OrderByProdutoEnum {
  'createdAt',
}

export class FiltrosProdutoDto extends PaginationDto {
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

  @ApiProperty({ required: false, enum: OrderByProdutoEnum, isArray: false })
  @IsString()
  @IsEnum(OrderByProdutoEnum)
  orderBy: string;

  @ApiProperty({ required: false, enum: OrderEnum, isArray: false })
  @IsEnum(OrderEnum)
  order: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  idFarmacia: string;

  @IsEnum(CategoriaEnum)
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ required: false })
  categoria: CategoriaEnum;
}
