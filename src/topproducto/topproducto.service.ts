import { MessageDto } from 'src/common/message.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TopProductoDto } from './dto/topproducto.dto';
import { TopProductoEntity } from './topproducto.entity';
import { TopProductoRepository } from './topproducto.repository';



@Injectable()
export class TopProductoService {

    constructor(
        @InjectRepository(TopProductoEntity)
        private topproductoRepository: TopProductoRepository
    ) { }

    async getAll(): Promise<TopProductoEntity[]> {
        const list = await this.topproductoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }
    
    async findById(id: number): Promise<TopProductoEntity> {
        const topproducto = await this.topproductoRepository.findOne({
            where: { id }
     }); 
        if (!topproducto) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return topproducto;
    }

    async findByNombre(nombre: string): Promise<TopProductoEntity> {
        const topproducto = await this.topproductoRepository.findOne({where: { nombre: nombre }});
        return topproducto;
    }


    async create(dto: TopProductoDto): Promise<any> {
        const { nombre } = dto;
        const exists = await this.findByNombre(nombre);
        if (exists) throw new BadRequestException(new MessageDto('ese nombre ya existe'));
        const topproducto = this.topproductoRepository.create(dto);
        await this.topproductoRepository.save(topproducto);
        return new MessageDto(`producto ${topproducto.nombre} creado`);
    }

    async update(id: number, dto: TopProductoDto): Promise<any> {
        const topproducto = await this.findById(id);
        if (!topproducto)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese producto ya existe'));
        dto.nombre ? topproducto.nombre = dto.nombre : topproducto.nombre = topproducto.nombre;
        dto.imagenUrl ? topproducto.imagenUrl = dto.imagenUrl : topproducto.imagenUrl = topproducto.imagenUrl;
        dto.descripcion ? topproducto.descripcion = dto.descripcion : topproducto.descripcion = topproducto.descripcion;
        dto.puntaje ? topproducto.puntaje = dto.puntaje : topproducto.puntaje = topproducto.puntaje;
        dto.rentabilidad ? topproducto.rentabilidad = dto.rentabilidad : topproducto.rentabilidad = topproducto.rentabilidad;
        await this.topproductoRepository.save(topproducto);
        return new MessageDto(`producto ${topproducto.nombre} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.topproductoRepository.delete(producto);
        return new MessageDto(`producto ${producto.nombre} eliminado`);
    }
}
