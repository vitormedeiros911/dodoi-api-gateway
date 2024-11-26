import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { ItemPedidoDto } from '../../pedido/dto/item-pedido.dto';
import { EnderecoDto } from '../../shared/dto/endereco.dto';

export class CriarPagamentoDto {
  @IsNumber()
  @IsDefined()
  @IsNumber()
  @ApiProperty()
  quantia: number;

  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  @ApiProperty()
  emailComprador: string;

  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @ApiProperty()
  nomeComprador: string;

  @IsNotEmpty()
  @IsDefined()
  itens: ItemPedidoDto[];

  @IsNotEmpty()
  @ApiProperty({
    type: EnderecoDto,
  })
  endereco: EnderecoDto;
}
