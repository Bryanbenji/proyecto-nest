import { CategoriaEntity } from './categoria.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(CategoriaEntity)
export class CategoriaRepository extends Repository<CategoriaEntity> {}