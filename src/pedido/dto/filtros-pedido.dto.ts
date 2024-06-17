import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StatusPedidoEnum } from '../enum/status-pedido.enum';

export class FiltrosPedidoDto {
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

  @IsNumberString()
  @ApiProperty({ required: false, default: 0 })
  skip: number;

  @IsNumberString()
  @ApiProperty({ required: false, default: 10 })
  limit: number;
}
