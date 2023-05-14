import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProveedorEntity } from "./proveedor.entity";
import { ProveedorRepository } from "./proveedor.repository";
import { MessageDto } from "src/common/message.dto";
import { ProveedorDto } from "./dto/proveedor.dto";



@Injectable()
export class ProveedorService {

    constructor(
        @InjectRepository(ProveedorEntity)
        private readonly proveedorRepository: ProveedorRepository,

    ) { }

    async getAll(): Promise<ProveedorEntity[]> {
        const list = await this.proveedorRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<ProveedorEntity> {
        const proveedor = await this.proveedorRepository.findOne({
            where: { id }
     }); 
        if (!proveedor) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return proveedor;
    }

    async findByNombre(nombre: string): Promise<ProveedorEntity> {
        const proveedor = await this.proveedorRepository.findOne({where: { nombre: nombre }});
        return proveedor;
    }

    async create(dto: ProveedorDto): Promise<any> {
        const { nombre } = dto;
        const exists = await this.findByNombre(nombre);
        if (exists) {
            throw new ConflictException(
              new MessageDto('Ya existe un proveedor con ese nombre'),
            );
          }
        const proveedor = this.proveedorRepository.create(dto);
        await this.proveedorRepository.save(proveedor);
        return new MessageDto(`proveedor ${proveedor.nombre} creado`);
    }

    async update(id: number, dto: ProveedorDto): Promise<any> {
        const proveedor = await this.findById(id);
        if (!proveedor)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.nombre);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese proveedor ya existe'));
        dto.ruc ? proveedor.ruc = dto.ruc : proveedor.ruc = proveedor.ruc;
        dto.nombre ? proveedor.nombre = dto.nombre : proveedor.nombre = proveedor.nombre;
        dto.telefono ? proveedor.telefono = dto.telefono : proveedor.telefono = proveedor.telefono;
        dto.email ? proveedor.email = dto.email : proveedor.email = proveedor.email;
        await this.proveedorRepository.save(proveedor);
        return new MessageDto(`proveedor ${proveedor.nombre} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const proveedor = await this.findById(id);
        await this.proveedorRepository.delete(proveedor);
        return new MessageDto(`proveedor ${proveedor.nombre} eliminado`);
    }
}
