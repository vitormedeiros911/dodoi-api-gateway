import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { PaginationDto } from '../../shared/dto/pagination.dto';
import { StatusPedidoEnum } from '../enum/status-pedido.enum';

export class FiltrosPedidoDto extends PaginationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  idCliente: string;

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
}
