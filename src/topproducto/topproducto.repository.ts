import { TopProductoEntity } from './topproducto.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TopProductoEntity)
export class TopProductoRepository extends Repository<TopProductoEntity> {

}