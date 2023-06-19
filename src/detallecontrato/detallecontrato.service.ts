import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DetalleContratoEntity } from "./detallecontrato.entity";
import { DetalleContratoRepository } from "./detallecontrato.repository";
import { MessageDto } from "src/common/message.dto";
import { DetalleContratoDto } from "./dto/detallecontrato.dto";



@Injectable()
export class DetalleContratoService {

    constructor(
        @InjectRepository(DetalleContratoEntity)
        private readonly detallecontratoRepository: DetalleContratoRepository,

    ) { }

    async getAll(): Promise<DetalleContratoEntity[]> {
        const list = await this.detallecontratoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<DetalleContratoEntity> {
        const detallecontrato = await this.detallecontratoRepository.findOne({
            where: { id }
     }); 
        if (!detallecontrato) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return detallecontrato;
    }

    async findByNombre(identificador: string): Promise<DetalleContratoEntity> {
        const detallecontrato = await this.detallecontratoRepository.findOne({where: { identificadorContrato: identificador }});
        return detallecontrato;
    }


    async create(dto: DetalleContratoDto): Promise<any> {
        const { identificadorContrato } = dto;
        const exists = await this.findByNombre(identificadorContrato);
        if (exists) {
            throw new ConflictException(
              new MessageDto('Ya existe un contrato con ese nombre'),
            );
          }
        const detallecontrato = this.detallecontratoRepository.create(dto);
        await this.detallecontratoRepository.save(detallecontrato);
        return new MessageDto(`detalle de contrato ${detallecontrato.identificadorContrato} creado`);
    }

    async update(id: number, dto: DetalleContratoDto): Promise<any> {
        const detallecontrato = await this.findById(id);
        if (!detallecontrato)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.identificadorContrato);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese contrato ya existe'));
        dto.identificadorContrato ? detallecontrato.identificadorContrato = dto.identificadorContrato : detallecontrato.identificadorContrato = detallecontrato.identificadorContrato;
        dto.fechaEntregaRealizada ? detallecontrato.fechaEntregaRealizada = dto.fechaEntregaRealizada : detallecontrato.fechaEntregaRealizada = detallecontrato.fechaEntregaRealizada;
        dto.descripcion ? detallecontrato.descripcion = dto.descripcion : detallecontrato.descripcion = detallecontrato.descripcion;
        await this.detallecontratoRepository.save(detallecontrato);
        return new MessageDto(`detalle de contrato ${detallecontrato.identificadorContrato} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const detallecontrato = await this.findById(id);
        await this.detallecontratoRepository.delete(detallecontrato);
        return new MessageDto(`detalle de contrato ${detallecontrato.identificadorContrato} eliminado`);
    }
}
