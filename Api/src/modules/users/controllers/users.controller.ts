import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateUser } from '../models/dto/CreateUser.dto';
import { UsersService } from '../services/users/users.service';
import { Role } from '../models/enum/role.enum';
import { UpdateUser } from '../models/dto/UpdateUser.dto';
import { Request } from 'src/interfaces/ExpressReq.interface';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Res() response, @Body() createdUserDto: CreateUser) {
    try {
      return this.userService.create(createdUserDto).pipe(
        map((saveData) => {
          return response.status(200).json({
            status: 200,
            message: saveData,
          });
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'UserController->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Res() response,
    @Param('id') id: number,
    @Body() createdUserDto: UpdateUser,
  ) {
    try {
      return this.userService.update(id, createdUserDto).pipe(
        map((updateStatus: any) => {
          return response.status(200).json({
            status: 200,
            message: updateStatus,
          });
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'UserController->Put ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Res() response) {
    try {
      return this.userService.findAll().pipe(
        map((users) => {
          if (users.length) {
            return response.status(200).json({
              status: 200,
              data: users,
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
        'UserController->findAll ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  find(@Res() response, @Param('id') id: number) {
    try {
      return this.userService.findOne(id).pipe(
        map((user) => {
          if (user) {
            return response.status(200).json({
              status: 200,
              data: user,
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
        'UserController->find ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('userRole')
  getRole() {
    try {
      return Role;
    } catch (error) {
      throw new InternalServerErrorException(
        'UserController->getRole ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getInfo(@Req() request: Request, @Res() response: Response) {
    try {
      return response.status(200).json({
        status: 200,
        data: request.user,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'UserController->getInfo ' + error.message,
      );
    }
  }
}
