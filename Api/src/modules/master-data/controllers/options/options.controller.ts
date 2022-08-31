import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateOptionsDto } from '../../dto/optionsDto/create-options.dto';
import { UpdateOptionsDto } from '../../dto/optionsDto/update-options.dto';
import { OptionsService } from '../../services/options/options.service';
import { Request } from '../../../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { map } from 'rxjs';
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Res() response: Response,
    @Req() request: Request,
    @Body() createOptionsDto: CreateOptionsDto,
  ) {
    try {
      createOptionsDto.createByUser = request.user;
      return this.optionsService.create(createOptionsDto).pipe(
        map((saveData) => {
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
        }),
      );
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
      return this.optionsService.findAll().pipe(
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
      return this.optionsService.findOne(+id).pipe(
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
    @Body() updateOptionsDto: UpdateOptionsDto,
  ) {
    try {
      updateOptionsDto.updateByUser = request.user;
      return this.optionsService.update(+id, updateOptionsDto).pipe(
        map((updateStatus: any) => {
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
        }),
      );
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
      return this.optionsService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }
}
