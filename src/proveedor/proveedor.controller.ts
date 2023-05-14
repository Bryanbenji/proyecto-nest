import { RolNombre } from './../rol/rol.enum';
import { RolesGuard } from './../guards/rol.guard';
import { MessageDto } from './../common/message.dto';
import { JwtAuthGuard } from './../guards/jwt.guard';
import { ProveedorService } from './proveedor.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { ProveedorDto } from './dto/proveedor.dto';
import { RolDecorator } from 'src/decorators/rol.decorator';

@Controller('proveedor')
export class ProveedorController {

    constructor(private readonly proveedorService: ProveedorService) {}

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.proveedorService.getAll();
    }

    @RolDecorator(RolNombre.ADMIN, RolNombre.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.proveedorService.findById(id);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: ProveedorDto) {
        return await this.proveedorService.create(dto);
    }
    
    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProveedorDto) {
        return await this.proveedorService.update(id, dto);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.proveedorService.delete(id)
    }
}
