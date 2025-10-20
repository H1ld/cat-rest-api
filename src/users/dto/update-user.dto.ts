import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Same as create-user.dto.ts, but fields are optionnal
export class UpdateUserDto extends PartialType(CreateUserDto) {}
