import { TopProductoEntity } from './topproducto.entity';
import { Module } from '@nestjs/common';
import { TopProductoService } from './topproducto.service';
import { TopProductoController } from './topproducto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [TypeOrmModule.forFeature([TopProductoEntity, TopProductoModule])],
    providers: [TopProductoService],
    controllers: [TopProductoController]
})
export class TopProductoModule { }
