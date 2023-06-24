import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReporteContratoEntity } from "./reportecontrato.entity";
import { ReporteContratoRepository } from "./reportecontrato.repository";
import { MessageDto } from "src/common/message.dto";
import { ReporteContratoDto } from "./dto/reportecontrato.dto";
import { LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm";



@Injectable()
export class ReporteContratoService {

    constructor(
        @InjectRepository(ReporteContratoEntity)
        private readonly reportecontratoRepository: ReporteContratoRepository,

    ) { }

    async getAll(): Promise<ReporteContratoEntity[]> {
        const list = await this.reportecontratoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }

    async findById(id: number): Promise<ReporteContratoEntity> {
        const reportecontrato = await this.reportecontratoRepository.findOne({
            where: { id }
     }); 
        if (!reportecontrato) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return reportecontrato;
    }

    async findByNombre(nombreproveedor: string): Promise<ReporteContratoEntity> {
        const reportecontrato = await this.reportecontratoRepository.findOne({where: { nombreproveedor: nombreproveedor }});
        return reportecontrato;
    }


    async create(dto: ReporteContratoDto): Promise<any> {
        const { ruc } = dto;
        const exists = await this.findByNombre(ruc);
        if (exists) {
            throw new ConflictException(
              new MessageDto('Ya existe un reporte contrato con ese nombre'),
            );
          }
        const reportecontrato = this.reportecontratoRepository.create(dto);
        await this.reportecontratoRepository.save(reportecontrato);
        return new MessageDto(`reporte contrato ${reportecontrato.id} creado`);
    }

    async update(id: number, dto: ReporteContratoDto): Promise<any> {
        const reportecontrato = await this.findById(id);
        if (!reportecontrato)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.ruc);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese contrato ya existe'));
        dto.nombreproveedor ? reportecontrato.nombreproveedor = dto.nombreproveedor : reportecontrato.nombreproveedor = reportecontrato.nombreproveedor;
        dto.fechaInicio ? reportecontrato.fechaInicio = dto.fechaInicio : reportecontrato.fechaInicio = reportecontrato.fechaInicio;
        dto.fechaFin ? reportecontrato.fechaFin = dto.fechaFin : reportecontrato.fechaFin = reportecontrato.fechaFin;
        dto.ruc ? reportecontrato.ruc = dto.ruc : reportecontrato.ruc = reportecontrato.ruc;
        dto.cantidadcontratos ? reportecontrato.cantidadcontratos = dto.cantidadcontratos : reportecontrato.cantidadcontratos = reportecontrato.cantidadcontratos;
        await this.reportecontratoRepository.save(reportecontrato);
        return new MessageDto(`contrato ${reportecontrato.id} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const reportecontrato = await this.findById(id);
        await this.reportecontratoRepository.delete(reportecontrato);
        return new MessageDto(`contrato ${reportecontrato.id} eliminado`);
    }




    async getReportBetweenDates(beginDateParam: Date, endDateParam: Date) {
        const beginDate = new Date(beginDateParam);
        const endDate = new Date(endDateParam);
        const report = [];
    
        const allContracts = await this.reportecontratoRepository.find({
            where: {
                fechaInicio : MoreThanOrEqual(beginDate),
                fechaFin : LessThanOrEqual(endDate),
            },
        });

        const uniqueProviders = [...new Set(allContracts.map((contract) => contract.nombreproveedor))];

        for (const provider of uniqueProviders) {
            const providerContracts = allContracts.filter((contract) => contract.nombreproveedor === provider);
            const totalContracts = providerContracts.length;

            report.push({ nombreproveedor: provider, cantidadcontratos: totalContracts});

        }

        return report;

      }


      
}
