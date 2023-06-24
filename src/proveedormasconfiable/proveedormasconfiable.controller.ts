import { RolNombre } from '../rol/rol.enum';
import { RolesGuard } from '../guards/rol.guard';
import { MessageDto } from '../common/message.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { ProveedorMasConfiableService } from './proveedormasconfiable.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { ProveedorMasConfiableDto } from './dto/proveedormasconfiable.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';

@Controller('proveedormasconfiable')
export class ProveedorMasConfiableController {

    constructor(private readonly proveedormasconfiableService: ProveedorMasConfiableService) {}

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.proveedormasconfiableService.getAll();
    }

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.proveedormasconfiableService.findById(id);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: ProveedorMasConfiableDto) {
        return await this.proveedormasconfiableService.create(dto);
    }
    
    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProveedorMasConfiableDto) {
        return await this.proveedormasconfiableService.update(id, dto);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.proveedormasconfiableService.delete(id)
    }
}
