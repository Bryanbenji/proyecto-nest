import { ProveedorMasConfiableEntity } from './proveedormasconfiable.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ProveedorMasConfiableEntity)
export class ProveedorMasConfiableRepository extends Repository<ProveedorMasConfiableEntity> {
    
}