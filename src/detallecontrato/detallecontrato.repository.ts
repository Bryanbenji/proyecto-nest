import { DetalleContratoEntity } from './detallecontrato.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(DetalleContratoEntity)
export class DetalleContratoRepository extends Repository<DetalleContratoEntity> {
    
}