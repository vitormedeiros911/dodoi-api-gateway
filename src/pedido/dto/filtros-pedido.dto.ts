import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { PaginationDto } from '../../shared/dto/pagination.dto';
import { OrderEnum } from '../../shared/enum/order.enum';
import { StatusPedidoEnum } from '../enum/status-pedido.enum';

enum OrderByPedidoEnum {
  'createdAt',
}

export class FiltrosPedidoDto extends PaginationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  idComprador: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  idFarmacia: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  idEntregador: string;

  @IsEnum(StatusPedidoEnum, { each: true })
  @IsNotEmpty()
  @ApiProperty({ required: false, enum: StatusPedidoEnum, isArray: true })
  status: string[];

  @ApiProperty({ required: false, enum: OrderByPedidoEnum, isArray: false })
  @IsString()
  @IsEnum(OrderByPedidoEnum)
  orderBy: string;

  @ApiProperty({ required: false, enum: OrderEnum, isArray: false })
  @IsEnum(OrderEnum)
  order: string;
}
