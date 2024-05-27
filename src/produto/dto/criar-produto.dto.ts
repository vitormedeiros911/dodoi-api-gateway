import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CriarProdutoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  descricao: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  urlImagem: string;

  @IsNumber()
  @IsNotEmpty()
  precoUnitario: number;
}
