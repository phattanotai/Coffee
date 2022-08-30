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
} from '@nestjs/common';
import { CreateTypesDto } from '../../dto/typesDto/create-types.dto';
import { UpdateTypesDto } from '../../dto/typesDto/update-types.dto';
import { TypesService } from '../../services/types/types.service';
import { Request } from '../../../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() request: Request, @Body() createTypesDto: CreateTypesDto) {
    try {
      createTypesDto.createByUser = request.user;
      createTypesDto.updateByUser = request.user;
      console.log(createTypesDto);
      return this.typesService.create(createTypesDto);
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
      return this.typesService.findAll();
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
      return this.typesService.findOne(+id);
    } catch (error) {
      throw new InternalServerErrorException(
        'categories->create ' + error.message,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() updateTypesDto: UpdateTypesDto,
  ) {
    try {
      updateTypesDto.updateByUser = request.user;
      return this.typesService.update(+id, updateTypesDto);
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
