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
import { CreateTablesDto } from '../../dto/tablesDto/create-tables.dto';
import { UpdateTablesDto } from '../../dto/tablesDto/update-tables.dto';
import { TablesService } from '../../services/tables/tables.service';
import { Request } from '../../../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { map } from 'rxjs';
@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Res() response: Response,
    @Req() request: Request,
    @Body() createTablesDto: CreateTablesDto,
  ) {
    try {
      createTablesDto.createByUser = request.user;
      return this.tablesService
        .create(createTablesDto)
        .then((saveData: any) => {
          if (!saveData.message) {
            return response.status(200).json({
              status: 200,
              message: 'create success',
            });
          } else {
            return response.status(201).json({
              status: 201,
              message: 'create fail ' + saveData.message,
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
      return this.tablesService.findAll().pipe(
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
      return this.tablesService.findOne(+id).pipe(
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
    @Body() updateTablesDto: UpdateTablesDto,
  ) {
    try {
      updateTablesDto.updateByUser = request.user;
      return this.tablesService
        .update(+id, updateTablesDto)
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
      return this.tablesService.remove(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }
}
