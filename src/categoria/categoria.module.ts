import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaEntity } from "./categoria.entity";
import { CategoriaController } from "./categoria.controller";
import { CategoriaService } from "./categoria.service";

@Module({
    imports: [TypeOrmModule.forFeature([CategoriaEntity])],
    providers: [CategoriaService],
    controllers: [CategoriaController]
})
export class CategoriaModule { }