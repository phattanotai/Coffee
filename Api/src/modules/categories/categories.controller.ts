import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  InternalServerErrorException,
  Res,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { HttpService } from '@nestjs/axios';
import { Request } from '../../interfaces/ExpressReq.interface';
import { map } from 'rxjs';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService, // private httpService: HttpService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: Request,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      createCategoryDto.createByUser = request.user;
      return this.categoriesService.create(createCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Res() response: Response): any {
    try {
      return this.categoriesService.findAll().pipe(
        map((cate) => {
          if (cate.length) {
            return response.status(200).json({
              status: 200,
              data: cate,
            });
          } else {
            return response.status(203).json({
              status: 203,
              data: [],
            });
          }
        }),
      );
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
      return this.categoriesService.findOne(+id).pipe(
        map((cate) => {
          if (cate) {
            return response.status(200).json({
              status: 200,
              data: cate,
            });
          } else {
            return response.status(203).json({
              status: 203,
              data: [],
            });
          }
        }),
      );
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
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      updateCategoryDto.updateByUser = request.user;
      return this.categoriesService
        .update(+id, updateCategoryDto)
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
      return this.categoriesService.remove(+id).then((data: any) => {
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
