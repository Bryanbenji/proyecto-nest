import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'contrato'})
export class ContratoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 100, nullable: false, unique: true})
    identificador: string;

    @Column({type: 'date', nullable: false})
    fechaInicio: Date;
    
    @Column({type: 'date', nullable: false})
    fechaFin: Date;

  
    @Column({type: 'varchar', length: 80, nullable: false})
    proveedor: string;
    
}