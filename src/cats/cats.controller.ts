import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse,ApiBearerAuth } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a cat' })
  @ApiResponse({ status: 201, description: 'Cat successfully created' })
  @ApiBearerAuth('JWT-auth')
  create(@Body() createCatDto: CreateCatDto, @Request() req) {
    return this.catsService.create(createCatDto, req.user);
  }

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all cats belonging to the authenticated user' })
  @ApiResponse({ status: 200, description: 'List of cats'})
  findAll(@Request() req) {
    return this.catsService.findAll(req.user);
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get a single cat (owned by the user)' })
  @ApiResponse({ status: 200, description: 'Cat found'})
  @ApiResponse({ status: 403, description: 'Not authorized' })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.catsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a cat (owned by the user)' })
  @ApiResponse({ status: 200, description: 'Cat updated'})
  @ApiResponse({ status: 403, description: 'Not authorized' })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto, @Request() req) {
    return this.catsService.update(+id, updateCatDto, req.user);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a cat (owned by the user)' })
  @ApiResponse({ status: 200, description: 'Cat deleted'})
  @ApiResponse({ status: 403, description: 'Not authorized' })
  @ApiResponse({ status: 404, description: 'Cat not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.catsService.remove(+id, req.user);
  }
}
