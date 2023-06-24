import { ProveedorMasConfiableEntity } from './proveedormasconfiable.entity';
import { Module } from '@nestjs/common';
import { ProveedorMasConfiableService } from './proveedormasconfiable.service';
import { ProveedorMasConfiableController } from './proveedormasconfiable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
    imports: [TypeOrmModule.forFeature([ProveedorMasConfiableEntity, ProveedorMasConfiableModule])],
    providers: [ProveedorMasConfiableService],
    controllers: [ProveedorMasConfiableController]
})
export class ProveedorMasConfiableModule { }