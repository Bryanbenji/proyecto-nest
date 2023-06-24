import { RolNombre } from '../rol/rol.enum';
import { RolesGuard } from '../guards/rol.guard';
import { MessageDto } from '../common/message.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ReporteContratoService } from './reportecontrato.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { ReporteContratoDto } from './dto/reportecontrato.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';


export interface dateParams {
    beginDate: Date;
    endDate: Date;
  }

@Controller('reportecontrato')
export class ReporteContratoController {

    constructor(private readonly reportecontratoService: ReporteContratoService) {}

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.reportecontratoService.getAll();
    }

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.reportecontratoService.findById(id);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: ReporteContratoDto) {
        return await this.reportecontratoService.create(dto);
    }
    
    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ReporteContratoDto) {
        return await this.reportecontratoService.update(id, dto);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.reportecontratoService.delete(id)
    }

    @Post('/minicore')
    async minicore(@Body() params: dateParams) {
    return await this.reportecontratoService.getReportBetweenDates(
      params.beginDate,
      params.endDate,
    );
  }
}
