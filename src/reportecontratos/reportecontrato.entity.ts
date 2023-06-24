import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'reportecontrato'})
export class ReporteContratoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 13, nullable: false})
    ruc: string;
    
    @Column({type: 'varchar',length: 80, nullable: false})
    nombreproveedor: string;
    
    @Column({type: 'float', nullable: false, default: 0})
    cantidadcontratos: number;

    @Column({type: 'date', nullable: false})
    fechaInicio: Date;
    
    @Column({type: 'date', nullable: false})
    fechaFin: Date;

}