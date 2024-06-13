import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsJWT()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty()
  idToken: string;
}
