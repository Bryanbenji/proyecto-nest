import { ProductoEntity } from './producto.entity';
import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../categoria/categoria.module';
import { CategoriaEntity } from 'src/categoria/categoria.entity';
import { ProductoRepository } from './producto.repository';



@Module({
    imports: [TypeOrmModule.forFeature([ProductoEntity, ProductoModule]), TypeOrmModule.forFeature([CategoriaEntity, CategoriaModule])],
    providers: [ProductoService],
    controllers: [ProductoController]
})
export class ProductoModule { }
