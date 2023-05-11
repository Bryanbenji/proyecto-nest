import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CategoriaService } from "./categoria.service";
import { RolDecorator } from "src/decorators/rol.decorator";
import { RolNombre } from "src/rol/rol.enum";
import { JwtAuthGuard } from "src/guards/jwt.guard";
import { RolesGuard } from "src/guards/rol.guard";
import { CategoriaDto } from "./dto/categoria.dto";



@Controller('categoria')
export class CategoriaController {

    constructor(private readonly categoriaService: CategoriaService) {}

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    async getAll() {
        return await this.categoriaService.getAll();
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: number) {
        return await this.categoriaService.findById(id);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Post()
    async create(@Body() dto: CategoriaDto) {
        return await this.categoriaService.create(dto);
    }
    
    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(new ValidationPipe({whitelist: true}))
    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: CategoriaDto) {
        return await this.categoriaService.update(id, dto);
    }

    @RolDecorator(RolNombre.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return await this.categoriaService.delete(id)
    }
}