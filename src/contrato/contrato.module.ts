import { ContratoEntity } from './contrato.entity';
import { Module } from '@nestjs/common';
import { ContratoService } from './contrato.service';
import { ContratoController } from './contrato.controller';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
    imports: [TypeOrmModule.forFeature([ContratoEntity, ContratoModule])],
    providers: [ContratoService],
    controllers: [ContratoController]
})
export class ContratoModule { }