import { ContratoEntity } from './contrato.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ContratoEntity)
export class ContratoRepository extends Repository<ContratoEntity> {
    
}