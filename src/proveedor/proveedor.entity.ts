import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'proveedor'})
export class ProveedorEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 13, nullable: false, unique: true})
    ruc: string;
    
    @Column({type: 'varchar',length: 80, nullable: false})
    nombre: string;

    @Column({type: 'varchar', length: 10, nullable: false, unique: true})
    telefono: string;
    
    @Column({type: 'varchar', length: 60, nullable: false, unique: true})
    email: string;
  
    
}