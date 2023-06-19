import { RolNombre } from '../rol/rol.enum';
import { RolesGuard } from '../guards/rol.guard';
import { MessageDto } from '../common/message.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ReporteVentaProductoService } from './reporteventaproducto.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { ReporteVentaProductoDto } from './dto/reporteventaproducto.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';

@Controller('reporteventaproducto')
export class ReporteVentaProductoController {

    constructor(private readonly reporteventaproductoService: ReporteVentaProductoService) {}

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.reporteventaproductoService.getAll();
    }

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.reporteventaproductoService.findById(id);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: ReporteVentaProductoDto) {
        return await this.reporteventaproductoService.create(dto);
    }
    
    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ReporteVentaProductoDto) {
        return await this.reporteventaproductoService.update(id, dto);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.reporteventaproductoService.delete(id)
    }
}
