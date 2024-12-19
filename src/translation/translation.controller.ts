import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TranslationService } from './translation.service';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { ApiQuery } from '@nestjs/swagger';
import { UseResponse } from 'src/decorator/UseResponse';
import { Translation } from './schemas/translation.schema';

@Controller('translation')
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post()
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationService.create(createTranslationDto);
  }

  @Get()
  @UseResponse(Translation)
  @ApiQuery({ name: 'search', required: false })
  findAll(@Query('search') search: string) {
    return this.translationService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ) {
    return this.translationService.update(id, updateTranslationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.translationService.remove(id);
  }
}
