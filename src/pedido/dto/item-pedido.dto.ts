import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ItemPedidoDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  idProduto: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  quantidade: number;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  precoUnitario: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  nomeProduto: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  urlImagem: string;
}
