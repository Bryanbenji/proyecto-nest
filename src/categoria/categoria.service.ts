import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaEntity } from "./categoria.entity";
import { CategoriaRepository } from "./categoria.repository";
import { MessageDto } from "src/common/message.dto";
import { CategoriaDto } from "./dto/categoria.dto";



@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(CategoriaEntity)
        private readonly categoriaRepository: CategoriaRepository,

    ) { }

    async getAll(): Promise<CategoriaEntity[]> {
        const list = await this.categoriaRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<CategoriaEntity> {
        const categoria = await this.categoriaRepository.findOne({
            where: { id }
     }); 
        if (!categoria) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return categoria;
    }

    async findByNombre(tipoCategoria: string): Promise<CategoriaEntity> {
        const categoria = await this.categoriaRepository.findOne({where: { tipoCategoria: tipoCategoria }});
        return categoria;
    }

    async create(dto: CategoriaDto): Promise<any> {
        const { tipoCategoria } = dto;
        const exists = await this.findByNombre(tipoCategoria);
        if (exists) {
            throw new ConflictException(
              new MessageDto('Ya existe una categoría con ese nombre'),
            );
          }
        const categoria = this.categoriaRepository.create(dto);
        await this.categoriaRepository.save(categoria);
        return new MessageDto(`categoria ${categoria.tipoCategoria} creado`);
    }

    async update(id: number, dto: CategoriaDto): Promise<any> {
        const categoria = await this.findById(id);
        if (!categoria)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.tipoCategoria);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese categoria ya existe'));
        dto.tipoCategoria ? categoria.tipoCategoria = dto.tipoCategoria : categoria.tipoCategoria = categoria.tipoCategoria;
        dto.descripcion ? categoria.descripcion = dto.descripcion : categoria.descripcion = categoria.descripcion;
        await this.categoriaRepository.save(categoria);
        return new MessageDto(`categoria ${categoria.tipoCategoria} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const categoria = await this.findById(id);
        await this.categoriaRepository.delete(categoria);
        return new MessageDto(`categoria ${categoria.tipoCategoria} eliminado`);
    }
}
