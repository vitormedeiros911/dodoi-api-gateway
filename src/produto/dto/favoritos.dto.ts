import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';

export class FavoritoDto {
  @IsDefined()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  idProduto: string;
}
