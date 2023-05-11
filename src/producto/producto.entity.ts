import { CategoriaEntity } from "src/categoria/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'producto'})
export class ProductoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    nombre: string;
    
    @Column({type: 'text', nullable: false})
    descripcion: string;
  
    @Column({type: 'float', nullable: false})
    precioVenta: number;
    
    @Column({type: 'float', nullable: false})
    precioCompra: number;
    
    @Column({type: 'int', nullable: false})
    totalVendido: number;

    @ManyToOne(() => CategoriaEntity, categoria => categoria.productos)
    categoria: CategoriaEntity;

}