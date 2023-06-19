import { MessageDto } from 'src/common/message.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReporteVentaProductoDto } from './dto/reporteventaproducto.dto';
import { ReporteVentaProductoEntity } from './reporteventaproducto.entity';
import { ReporteVentaProductoRepository } from './reporteventaproducto.repository';



@Injectable()
export class ReporteVentaProductoService {

    constructor(
        @InjectRepository(ReporteVentaProductoEntity)
        private reporteventaproductoRepository: ReporteVentaProductoRepository
    ) { }

    async getAll(): Promise<ReporteVentaProductoEntity[]> {
        const list = await this.reporteventaproductoRepository.find();
        if (!list.length) {
            throw new NotFoundException(new MessageDto('la lista está vacía'));
        }
        return list;
    }
    
    async findById(id: number): Promise<ReporteVentaProductoEntity> {
        const reporteventaproducto = await this.reporteventaproductoRepository.findOne({
            where: { id }
     }); 
        if (!reporteventaproducto) {
            throw new NotFoundException(new MessageDto('no existe'));
        }
        return reporteventaproducto;
    }

    async findByNombre(nombre: string): Promise<ReporteVentaProductoEntity> {
        const reporteventaproducto = await this.reporteventaproductoRepository.findOne({where: { nombreproducto: nombre }});
        return reporteventaproducto;
    }

    async create(dto: ReporteVentaProductoDto): Promise<any> {
        const { nombreproducto } = dto;
        const exists = await this.findByNombre(nombreproducto);
        if (exists) throw new BadRequestException(new MessageDto('ese nombre ya existe'));
        const reporteventaproducto = this.reporteventaproductoRepository.create(dto);
        await this.reporteventaproductoRepository.save(reporteventaproducto);
        return new MessageDto(`reporte de venta de producto ${reporteventaproducto.nombreproducto} creado`);
    }

    async update(id: number, dto: ReporteVentaProductoDto): Promise<any> {
        const reporteventaproducto = await this.findById(id);
        if (!reporteventaproducto)
            throw new NotFoundException(new MessageDto('no existe'));
        const exists = await this.findByNombre(dto.nombreproducto);
        if (exists && exists.id !== id) throw new BadRequestException(new MessageDto('ese reporte de venta de producto ya existe'));
        dto.nombreproducto ? reporteventaproducto.nombreproducto = dto.nombreproducto : reporteventaproducto.nombreproducto = reporteventaproducto.nombreproducto;
        dto.precioVenta ? reporteventaproducto.precioVenta = dto.precioVenta : reporteventaproducto.precioVenta = reporteventaproducto.precioVenta;
        dto.totalVendido ? reporteventaproducto.totalVendido = dto.totalVendido : reporteventaproducto.totalVendido = reporteventaproducto.totalVendido;
        await this.reporteventaproductoRepository.save(reporteventaproducto);
        return new MessageDto(`reporte de venta de producto ${reporteventaproducto.nombreproducto} actualizado`);
    }

    async delete(id: number): Promise<any> {
        const reporteventaproducto = await this.findById(id);
        await this.reporteventaproductoRepository.delete(reporteventaproducto);
        return new MessageDto(`reporte de venta de producto ${reporteventaproducto.nombreproducto} eliminado`);
    }
}
