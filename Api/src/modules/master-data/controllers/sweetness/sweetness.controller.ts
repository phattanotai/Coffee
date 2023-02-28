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
  Res,
  Put,
} from '@nestjs/common';
import { CreateSweetnessDto } from '../../dto/sweetnessDto/create-sweetness.dto';
import { UpdateSweetnessDto } from '../../dto/sweetnessDto/update-sweetness.dto';
import { SweetnessService } from '../../services/sweetness/sweetness.service';
import { Request } from '../../../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { map } from 'rxjs';
@Controller('sweetness')
export class SweetnessController {
  constructor(private readonly sweetnessService: SweetnessService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Res() response: Response,
    @Req() request: Request,
    @Body() createSweetnessDto: CreateSweetnessDto,
  ) {
    try {
      createSweetnessDto.createByUser = request.user;
      return this.sweetnessService
        .create(createSweetnessDto)
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
      return this.sweetnessService.findAll().pipe(
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
      return this.sweetnessService.findOne(+id).pipe(
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
    @Body() updateSweetnessDto: UpdateSweetnessDto,
  ) {
    try {
      updateSweetnessDto.updateByUser = request.user;
      return this.sweetnessService
        .update(+id, updateSweetnessDto)
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
      return this.sweetnessService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }
}
