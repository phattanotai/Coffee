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
} from '@nestjs/common';
import { CreateTablesDto } from '../../dto/tablesDto/create-tables.dto';
import { UpdateTablesDto } from '../../dto/tablesDto/update-tables.dto';
import { TablesService } from '../../services/tables/tables.service';
import { Request } from '../../../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() request: Request, @Body() createTablesDto: CreateTablesDto) {
    try {
      createTablesDto.createByUser = request.user;
      return this.tablesService.create(createTablesDto);
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
      return this.tablesService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.tablesService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateTablesDto: UpdateTablesDto,
  ) {
    try {
      updateTablesDto.updateByUser = request.user;
      return this.tablesService.update(+id, updateTablesDto);
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
