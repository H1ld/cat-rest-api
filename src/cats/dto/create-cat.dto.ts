import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ example: 'Charlie', description: 'Name of the cat' })
  @IsString()
  public name: string;

  @ApiProperty({ example: 'white', description: 'Color of the cat' })
  @IsString()
  public color: string;
}
