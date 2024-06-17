import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { ItemCarrinhoDto } from './item-carrinho.dto';

export class CarrinhoDto {
  @IsArray()
  @ApiProperty({ type: [ItemCarrinhoDto], isArray: true })
  produtos: ItemCarrinhoDto[];
}
