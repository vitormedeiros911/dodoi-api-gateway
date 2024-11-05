import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

import { PerfilEnum } from '../../shared/enum/perfil.enum';

export class CriarUsuarioDto {
  constructor(partial: Partial<CriarUsuarioDto>) {
    Object.assign(this, partial);
  }

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
  @IsUrl()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  urlImagem: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(PerfilEnum, { each: true })
  @ApiProperty({
    enum: PerfilEnum,
    isArray: true,
  })
  perfis: PerfilEnum[] = [PerfilEnum.CLIENTE];
}
