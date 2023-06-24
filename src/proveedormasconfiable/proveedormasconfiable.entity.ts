import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'proveedormasconfiable'})
export class ProveedorMasConfiableEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 13, nullable: false})
    ruc: string;
    
    @Column({type: 'varchar',length: 80, nullable: false})
    nombreproveedor: string;
    
    @Column({type: 'varchar', length: 100, nullable: false})
    producto: string;
    
    @Column({type: 'float', nullable: false})
    puntaje: number;

    @Column({type: 'varchar', length: 40, nullable: false, default : 'espera'})
    recindir: string;

}