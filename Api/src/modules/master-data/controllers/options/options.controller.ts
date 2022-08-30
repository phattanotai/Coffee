import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateOptionsDto } from '../../dto/optionsDto/create-options.dto';
import { UpdateOptionsDto } from '../../dto/optionsDto/update-options.dto';
import { OptionsService } from '../../services/options/options.service';
import { Request } from '../../../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() request: Request, @Body() createOptionsDto: CreateOptionsDto) {
    try {
      createOptionsDto.createByUser = request.user;
      return this.optionsService.create(createOptionsDto);
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
      return this.optionsService.findAll();
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
      return this.optionsService.findOne(+id);
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
    @Body() updateOptionsDto: UpdateOptionsDto,
  ) {
    try {
      updateOptionsDto.updateByUser = request.user;
      return this.optionsService.update(+id, updateOptionsDto);
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
