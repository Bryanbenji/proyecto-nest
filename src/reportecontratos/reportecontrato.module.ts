import { ReporteContratoEntity } from './reportecontrato.entity';
import { Module } from '@nestjs/common';
import { ReporteContratoService } from './reportecontrato.service';
import { ReporteContratoController } from './reportecontrato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
    imports: [TypeOrmModule.forFeature([ReporteContratoEntity, ReporteContratoModule])],
    providers: [ReporteContratoService],
    controllers: [ReporteContratoController]
})
export class ReporteContratoModule { }