import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Req,
  UseGuards,
  Put,
  Res,
} from '@nestjs/common';
import { CreateTypesDto } from '../../dto/typesDto/create-types.dto';
import { UpdateTypesDto } from '../../dto/typesDto/update-types.dto';
import { TypesService } from '../../services/types/types.service';
import { Request } from '../../../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { map } from 'rxjs';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Res() response: Response,
    @Req() request: Request,
    @Body() createTypesDto: CreateTypesDto,
  ) {
    try {
      createTypesDto.createByUser = request.user;
      createTypesDto.updateByUser = request.user;
      return this.typesService.create(createTypesDto).then((saveData) => {
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
      return this.typesService.findAll().pipe(
        map((data) => {
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
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      return this.typesService.findOne(+id).pipe(
        map((data) => {
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
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateTypesDto: UpdateTypesDto,
  ) {
    try {
      updateTypesDto.updateByUser = request.user;
      return this.typesService
        .update(+id, updateTypesDto)
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
        'categories->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.typesService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }
}
