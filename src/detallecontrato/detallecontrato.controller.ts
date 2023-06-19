import { RolNombre } from '../rol/rol.enum';
import { RolesGuard } from '../guards/rol.guard';
import { MessageDto } from '../common/message.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { DetalleContratoService } from './detallecontrato.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { DetalleContratoDto } from './dto/detallecontrato.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';

@Controller('detallecontrato')
export class DetalleContratoController {

    constructor(private readonly detallecontratoService: DetalleContratoService) {}

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.detallecontratoService.getAll();
    }

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.detallecontratoService.findById(id);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: DetalleContratoDto) {
        return await this.detallecontratoService.create(dto);
    }
    
    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: DetalleContratoDto) {
        return await this.detallecontratoService.update(id, dto);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.detallecontratoService.delete(id)
    }
}
