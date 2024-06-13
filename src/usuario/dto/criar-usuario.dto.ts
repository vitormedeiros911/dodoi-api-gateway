import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { EnderecoDto } from 'src/shared/dto/endereco.dto';

import { PerfilEnum } from '../../shared/enum/perfil.enum';

export class CriarUsuarioDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty()
  nome: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  cpf: string;

  @IsString()
  @IsUrl()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  urlImagem: string;

  @IsDateString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  dataNascimento: Date;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  telefone: string;

  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: EnderecoDto,
  })
  endereco: EnderecoDto;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PerfilEnum, { each: true })
  @ApiProperty({
    enum: PerfilEnum,
    isArray: true,
  })
  perfis: PerfilEnum[];
}
