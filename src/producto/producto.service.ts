import { MessageDto } from 'src/common/message.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoDto } from './dto/producto.dto';
import { ProductoEntity } from './producto.entity';
import { ProductoRepository } from './producto.repository';
import { CategoriaEntity } from 'src/categoria/categoria.entity';
import { CategoriaRepository } from 'src/categoria/categoria.repository';


@Injectable()
export class ProductoService {

    constructor(
        @InjectRepository(CategoriaEntity)
        private categoriaRepository: CategoriaRepository,

        @InjectRepository(ProductoEntity)
        private productoRepository: ProductoRepository
    ) { }

    async getAll(): Promise<ProductoEntity[]> {
        const list = await this.productoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({
            where: { id }
     }); 
        if (!producto) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return producto;
    }

    async findByNombre(nombre: string): Promise<ProductoEntity> {
        const producto = await this.productoRepository.findOne({where: { nombre: nombre }});
        return producto;
    }

    async create(dto: ProductoDto): Promise<any> {
        const { nombre, categoriaId } = dto;
        const exists = await this.findByNombre(nombre);
        const categoria = await this.categoriaRepository.findOne({ where: { id: categoriaId } });
        if (!categoria) {
            throw new NotFoundException(`Categoria con id ${categoriaId} no encontrada`);
          }
        if (exists) throw new BadRequestException(new MessageDto('ese nombre ya existe'));
        const producto = this.productoRepository.create(dto);
        producto.categoria = categoria;
        await this.productoRepository.save(producto);
        return new MessageDto(`producto ${producto.nombre} creado`);
    }

    async update(id: number, dto: ProductoDto): Promise<any> {
        const producto = await this.findById(id);
        if (!producto)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese producto ya existe'));
        dto.nombre ? producto.nombre = dto.nombre : producto.nombre = producto.nombre;
        dto.descripcion ? producto.descripcion = dto.descripcion : producto.descripcion = producto.descripcion;
        dto.precioVenta ? producto.precioVenta = dto.precioVenta : producto.precioVenta = producto.precioVenta;
        dto.precioCompra ? producto.precioCompra = dto.precioCompra : producto.precioCompra = producto.precioCompra;
        dto.totalVendido ? producto.totalVendido = dto.totalVendido : producto.totalVendido = producto.totalVendido;
        await this.productoRepository.save(producto);
        return new MessageDto(`producto ${producto.nombre} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return new MessageDto(`producto ${producto.nombre} eliminado`);
    }
}