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
import { CreateSweetnessDto } from '../../dto/sweetnessDto/create-sweetness.dto';
import { UpdateSweetnessDto } from '../../dto/sweetnessDto/update-sweetness.dto';
import { SweetnessService } from '../../services/sweetness/sweetness.service';
import { Request } from '../../../../interfaces/ExpressReq.interface';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('sweetness')
export class SweetnessController {
  constructor(private readonly sweetnessService: SweetnessService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() request: Request,
    @Body() createSweetnessDto: CreateSweetnessDto,
  ) {
    try {
      createSweetnessDto.createByUser = request.user;
      return this.sweetnessService.create(createSweetnessDto);
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
      return this.sweetnessService.findAll();
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
      return this.sweetnessService.findOne(+id);
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
    @Body() updateSweetnessDto: UpdateSweetnessDto,
  ) {
    try {
      updateSweetnessDto.updateByUser = request.user;
      return this.sweetnessService.update(+id, updateSweetnessDto);
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
