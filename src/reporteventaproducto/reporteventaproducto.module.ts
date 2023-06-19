import { ReporteVentaProductoEntity } from './reporteventaproducto.entity';
import { Module } from '@nestjs/common';
import { ReporteVentaProductoService } from './reporteventaproducto.service';
import { ReporteVentaProductoController } from './reporteventaproducto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([ReporteVentaProductoEntity, ReporteVentaProductoModule])],
    providers: [ReporteVentaProductoService],
    controllers: [ReporteVentaProductoController]
})
export class ReporteVentaProductoModule { }
