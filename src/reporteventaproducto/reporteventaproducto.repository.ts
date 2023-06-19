import { ReporteVentaProductoEntity } from './reporteventaproducto.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ReporteVentaProductoEntity)
export class ReporteVentaProductoRepository extends Repository<ReporteVentaProductoEntity> {

}