import { ReporteContratoEntity } from './reportecontrato.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ReporteContratoEntity)
export class ReporteContratoRepository extends Repository<ReporteContratoEntity> {
    
}