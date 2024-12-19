import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTranslationDto } from './dto/create-translation.dto';
import { UpdateTranslationDto } from './dto/update-translation.dto';
import { Translation, TranslationDocument } from './schemas/translation.schema';

@Injectable()
export class TranslationService {
  constructor(
    @InjectModel(Translation.name)
    private translationModel: Model<TranslationDocument>,
  ) {}

  async create(
    createTranslationDto: CreateTranslationDto,
  ): Promise<Translation> {
    const createdTranslation = new this.translationModel(createTranslationDto);
    return createdTranslation.save();
  }
  async findAll(search?: string): Promise<Translation[]> {
    if (!search) {
      return this.translationModel.find().exec();
    }
    const regex = new RegExp(search, 'i');
    return this.translationModel
      .find({
        $or: [{ key: { $regex: regex } }, { value: { $regex: regex } }],
      })
      .exec();
  }

  async findOne(id: string): Promise<Translation> {
    const translation = await this.translationModel.findById(id).exec();
    if (!translation) {
      throw new NotFoundException(`Translation with ID ${id} not found`);
    }
    return translation;
  }

  async update(
    id: string,
    updateTranslationDto: UpdateTranslationDto,
  ): Promise<Translation> {
    const updatedTranslation = await this.translationModel
      .findByIdAndUpdate(id, updateTranslationDto, { new: true })
      .exec();
    if (!updatedTranslation) {
      throw new NotFoundException(`Translation with ID ${id} not found`);
    }
    return updatedTranslation;
  }

  async remove(id: string): Promise<Translation> {
    const deletedTranslation = await this.translationModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedTranslation) {
      throw new NotFoundException(`Translation with ID ${id} not found`);
    }
    return deletedTranslation;
  }
}
