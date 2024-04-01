import { Controller, Get, Param } from '@nestjs/common';
import { ApiOAuth2, ApiParam, ApiTags } from '@nestjs/swagger';
import { Tag } from './tag.entity';
import { TagsService } from './tags.service';

@ApiOAuth2([], 'oauth2')
@Controller('tags')
@ApiTags('Tag')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async findAll(): Promise<Tag[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Tag ID' }) // Add route parameter documentation
  async findOneByTagId(@Param('id') id: number): Promise<Tag> {
    return this.tagsService.findOne(id);
  }
}
