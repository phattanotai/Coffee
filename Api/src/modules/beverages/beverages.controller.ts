import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BeveragesService } from './beverages.service';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/helpers/upload.function';
import { uploadConfig } from 'src/helpers/config/config';
import { Request } from '../../interfaces/ExpressReq.interface';
import { Response } from 'express';

@Controller('beverages')
export class BeveragesController {
  constructor(private readonly beveragesService: BeveragesService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('image', storage(uploadConfig.imagesPath)))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        return {
          message: 'invalid file',
          status: 201,
        };
      }
      return {
        message: 'file has been uploaded',
        status: 200,
        path: file.path,
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
    @Res() response: Response,
    @Req() request: Request,
    @Body() createBeverageDto: CreateBeverageDto,
  ) {
    try {
      createBeverageDto.createByUser = request.user;
      return this.beveragesService
        .create(createBeverageDto)
        .then((saveData) => {
          if (saveData) {
            return response.status(200).json({
              status: 200,
              message: 'create success',
            });
          } else {
            return response.status(201).json({
              status: 201,
              message: 'create fail',
            });
          }
        });
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Res() response: Response) {
    try {
      return this.beveragesService.findAll().then((data) => {
        if (data.length) {
          return response.status(200).json({
            status: 200,
            data: data,
          });
        } else {
          return response.status(203).json({
            status: 203,
            data: [],
          });
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->findAll ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      return this.beveragesService.findOne(+id).then((data) => {
        if (data) {
          return response.status(200).json({
            status: 200,
            data: data,
          });
        } else {
          return response.status(203).json({
            status: 203,
            data: [],
          });
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->findOne ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateBeverageDto: UpdateBeverageDto,
  ) {
    try {
      updateBeverageDto.updateByUser = request.user;
      return this.beveragesService
        .update(+id, updateBeverageDto)
        .then((updateStatus: any) => {
          if (updateStatus) {
            return response.status(200).json({
              status: 200,
              message: 'update success',
            });
          } else {
            return response.status(201).json({
              status: 201,
              message: 'update fail',
            });
          }
        });
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->update ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Res() response: Response, @Param('id') id: string) {
    try {
      return this.beveragesService.remove(+id).then((data: any) => {
        if (data) {
          return response.status(200).json({
            status: 200,
            message: 'delete success',
          });
        } else {
          return response.status(201).json({
            status: 201,
            message: 'delete fail',
          });
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->remove ' + error.message,
      );
    }
  }
}
