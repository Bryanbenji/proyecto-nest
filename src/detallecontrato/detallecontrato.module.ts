import { DetalleContratoEntity } from './detallecontrato.entity';
import { Module } from '@nestjs/common';
import { DetalleContratoService } from './detallecontrato.service';
import { DetalleContratoController } from './detallecontrato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
    imports: [TypeOrmModule.forFeature([DetalleContratoEntity, DetalleContratoModule])],
    providers: [DetalleContratoService],
    controllers: [DetalleContratoController]
})
export class DetalleContratoModule { }