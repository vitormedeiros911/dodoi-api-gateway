import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';

import { ItemPedidoDto } from './item-pedido.dto';

export class PedidoDto {
  @IsArray()
  @ApiProperty({ type: [ItemPedidoDto], isArray: true })
  itens: ItemPedidoDto[];

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  idFarmacia: string;
}
