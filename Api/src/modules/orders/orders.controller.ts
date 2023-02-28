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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './models/dto/create-order.dto';
import { UpdateOrderDto } from './models/dto/update-order.dto';
import { Response } from 'express';
import { Request } from '../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Status } from './models/enum/orders-status.enum';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(
    @Res() response: Response,
    @Req() request: Request,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    try {
      return this.ordersService.create(createOrderDto).then((saveData) => {
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

  @Post('all/')
  createAll(
    @Res() response: Response,
    @Req() request: Request,
    @Body() createOrderDto: CreateOrderDto[],
  ) {
    try {
      return this.ordersService.createAll(createOrderDto).then((saveData) => {
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

  @Get()
  findAll(@Res() response: Response) {
    try {
      return this.ordersService.findAll().then((data) => {
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
        'categories->create ' + error.message,
      );
    }
  }

  @Get('status')
  getStatus() {
    try {
      return Status;
    } catch (error) {
      throw new InternalServerErrorException(
        'bills->getStatus ' + error.message,
      );
    }
  }

  @Get('byBill/:id')
  findByBill(@Res() response: Response, @Param('id') id: string) {
    try {
      const p = { where: [{ bill: id }], relations: ['bill', 'beverage'] };
      return this.ordersService.find(p).then((data) => {
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
        'categories->create ' + error.message,
      );
    }
  }

  @Get(':id')
  findOne(@Res() response: Response, @Param('id') id: string) {
    try {
      return this.ordersService.findOne(+id).then((data) => {
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
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    try {
      updateOrderDto.updateByUser = request.user;
      return this.ordersService
        .update(+id, updateOrderDto)
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
  remove(
    @Res() response: Response,
    @Req() request: Request,
    @Param('id') id: string,
  ) {
    try {
      return this.ordersService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }
}
