import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BeveragesService } from './beverages.service';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/helpers/upload.function';
import { uploadConfig } from 'src/helpers/config/config';
import { Request } from '../../interfaces/ExpressReq.interface';

@Controller('beverages')
export class BeveragesController {
  constructor(private readonly beveragesService: BeveragesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('image', storage(uploadConfig.imagesPath)))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        return {
          message: 'invalid file',
          status: false,
        };
      }
      return {
        message: 'file has been uploaded',
        status: true,
        path: file.filename,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: Request,
    @Body() createBeverageDto: CreateBeverageDto,
  ) {
    try {
      createBeverageDto.createByUser = request.user;
      return this.beveragesService.create(createBeverageDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    try {
      return this.beveragesService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->findAll ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.beveragesService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->findOne ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateBeverageDto: UpdateBeverageDto,
  ) {
    try {
      updateBeverageDto.updateByUser = request.user;
      return this.beveragesService.update(+id, updateBeverageDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->update ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.beveragesService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->remove ' + error.message,
      );
    }
  }
}
