import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContratoEntity } from "./contrato.entity";
import { ContratoRepository } from "./contrato.repository";
import { MessageDto } from "src/common/message.dto";
import { ContratoDto } from "./dto/contrato.dto";



@Injectable()
export class ContratoService {

    constructor(
        @InjectRepository(ContratoEntity)
        private readonly contratoRepository: ContratoRepository,

    ) { }

    async getAll(): Promise<ContratoEntity[]> {
        const list = await this.contratoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<ContratoEntity> {
        const contrato = await this.contratoRepository.findOne({
            where: { id }
     }); 
        if (!contrato) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return contrato;
    }

    async findByNombre(identificador: string): Promise<ContratoEntity> {
        const contrato = await this.contratoRepository.findOne({where: { identificador: identificador }});
        return contrato;
    }


    async create(dto: ContratoDto): Promise<any> {
        const { identificador } = dto;
        const exists = await this.findByNombre(identificador);
        if (exists) {
            throw new ConflictException(
              new MessageDto('Ya existe un contrato con ese nombre'),
            );
          }
        const contrato = this.contratoRepository.create(dto);
        await this.contratoRepository.save(contrato);
        return new MessageDto(`contrato ${contrato.identificador} creado`);
    }

    async update(id: number, dto: ContratoDto): Promise<any> {
        const contrato = await this.findById(id);
        if (!contrato)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.identificador);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese contrato ya existe'));
        dto.identificador ? contrato.identificador = dto.identificador : contrato.identificador = contrato.identificador;
        dto.fechaInicio ? contrato.fechaInicio = dto.fechaInicio : contrato.fechaInicio = contrato.fechaInicio;
        dto.fechaFin ? contrato.fechaFin = dto.fechaFin : contrato.fechaFin = contrato.fechaFin;
        dto.fechaEntregaRealizada ? contrato.fechaEntregaRealizada = dto.fechaEntregaRealizada : contrato.fechaEntregaRealizada = contrato.fechaEntregaRealizada;
        dto.descripcion ? contrato.descripcion = dto.descripcion : contrato.descripcion = contrato.descripcion;
        dto.proveedor ? contrato.proveedor = dto.proveedor : contrato.proveedor = contrato.proveedor;
        await this.contratoRepository.save(contrato);
        return new MessageDto(`contrato ${contrato.identificador} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const contrato = await this.findById(id);
        await this.contratoRepository.delete(contrato);
        return new MessageDto(`contrato ${contrato.identificador} eliminado`);
    }
}
