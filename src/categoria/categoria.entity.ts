import { ProductoEntity } from "src/producto/producto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'categoria'})
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 40, nullable: false, unique: true})
    tipoCategoria: string;
    
    @Column({type: 'text', nullable: false})
    descripcion: string;
}