import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTranslationDto {
  @ApiProperty({
    description: 'The key for the translation',
    example: 'greeting',
  })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ description: 'The locale for the translation', example: 'en' })
  @IsString()
  @IsNotEmpty()
  locale: string;

  @ApiProperty({
    description: 'The value of the translation',
    example: 'Hello',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}
