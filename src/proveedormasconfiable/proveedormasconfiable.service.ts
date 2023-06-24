import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProveedorMasConfiableEntity } from "./proveedormasconfiable.entity";
import { ProveedorMasConfiableRepository } from "./proveedormasconfiable.repository";
import { MessageDto } from "src/common/message.dto";
import { ProveedorMasConfiableDto } from "./dto/proveedormasconfiable.dto";



@Injectable()
export class ProveedorMasConfiableService {

    constructor(
        @InjectRepository(ProveedorMasConfiableEntity)
        private readonly proveedormasconfiableRepository: ProveedorMasConfiableRepository,

    ) { }

    async getAll(): Promise<ProveedorMasConfiableEntity[]> {
        const list = await this.proveedormasconfiableRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<ProveedorMasConfiableEntity> {
        const proveedorconfiable = await this.proveedormasconfiableRepository.findOne({
            where: { id }
     }); 
        if (!proveedorconfiable) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return proveedorconfiable;
    }

    async findByNombre(nombre: string): Promise<ProveedorMasConfiableEntity> {
        const proveedorconfiable = await this.proveedormasconfiableRepository.findOne({where: { nombreproveedor: nombre }});
        return proveedorconfiable;
    }

    async create(dto: ProveedorMasConfiableDto): Promise<any> {
        const { nombreproveedor } = dto;
        const exists = await this.findByNombre(nombreproveedor);
        if (exists) {
            throw new ConflictException(
              new MessageDto('Ya existe un proveedor con ese nombre'),
            );
          }
        const proveedor = this.proveedormasconfiableRepository.create(dto);
        await this.proveedormasconfiableRepository.save(proveedor);
        return new MessageDto(`proveedor confiable ${proveedor.nombreproveedor} creado`);
    }

    async update(id: number, dto: ProveedorMasConfiableDto): Promise<any> {
        const proveedorconfiable = await this.findById(id);
        if (!proveedorconfiable)
            throw new NotFoundException(new MessageDto('no existe'));
        //const exists = await this.findByNombre(dto.nombre);
        //if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese proveedor ya existe'));
        dto.ruc ? proveedorconfiable.ruc = dto.ruc : proveedorconfiable.ruc = proveedorconfiable.ruc;
        dto.nombreproveedor ? proveedorconfiable.nombreproveedor = dto.nombreproveedor : proveedorconfiable.nombreproveedor = proveedorconfiable.nombreproveedor;
        dto.producto ? proveedorconfiable.producto = dto.producto : proveedorconfiable.producto = proveedorconfiable.producto;
        dto.puntaje ? proveedorconfiable.puntaje = dto.puntaje : proveedorconfiable.puntaje = proveedorconfiable.puntaje;
        dto.recindir ? proveedorconfiable.recindir = dto.recindir : proveedorconfiable.recindir = proveedorconfiable.recindir;
        await this.proveedormasconfiableRepository.save(proveedorconfiable);
        return new MessageDto(`proveedor ${proveedorconfiable.nombreproveedor}} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const proveedorconfiable = await this.findById(id);
        await this.proveedormasconfiableRepository.delete(proveedorconfiable);
        return new MessageDto(`proveedor ${proveedorconfiable.nombreproveedor} eliminado`);
    }
}
