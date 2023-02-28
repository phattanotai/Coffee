import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Req,
  InternalServerErrorException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BillsService } from './bills.service';
import { CreateBillDto } from './models/dto/create-bill.dto';
import { UpdateBillDto } from './models/dto/update-bill.dto';
import { Response } from 'express';
import { Request } from '../../interfaces/ExpressReq.interface';
import { map } from 'rxjs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Status } from './models/enum/bills-status.enum';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  create(
    @Res() response: Response,
    @Req() request: Request,
    @Body() createBillDto: CreateBillDto,
  ) {
    try {
      return this.billsService.create(createBillDto).then((saveData) => {
        if (saveData) {
          return response.status(200).json({
            status: 200,
            message: 'create success',
            data: saveData,
          });
        } else {
          return response.status(201).json({
            status: 201,
            message: 'create fail',
          });
        }
      });
    } catch (error) {
      throw new InternalServerErrorException('bills->create ' + error.message);
    }
  }

  @Get()
  findAll(@Res() response: Response) {
    try {
      return this.billsService.findAll().then((data) => {
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
      throw new InternalServerErrorException('bills->create ' + error.message);
    }
  }

  @Get('/status')
  getStatus() {
    try {
      return Status;
    } catch (error) {
      throw new InternalServerErrorException(
        'bills->getStatus ' + error.message,
      );
    }
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      return this.billsService.findOne(+id).then((data) => {
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
      throw new InternalServerErrorException('bills->create ' + error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateBillDto: UpdateBillDto,
  ) {
    try {
      updateBillDto.updateByUser = request.user;
      return this.billsService
        .update(+id, updateBillDto)
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
      throw new InternalServerErrorException('bills->create ' + error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    // @Res() response: Response,
    // @Req() request: Request,
    @Param('id') id: string,
  ) {
    try {
      return this.billsService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException('bills->create ' + error.message);
    }
  }
}
