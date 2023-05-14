import { ProveedorEntity } from './proveedor.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ProveedorEntity)
export class ProveedorRepository extends Repository<ProveedorEntity> {
    
}