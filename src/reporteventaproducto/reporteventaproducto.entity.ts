import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'reporteventaproducto'})
export class ReporteVentaProductoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    nombreproducto: string;
  
    @Column({type: 'float', nullable: false})
    precioVenta: number;
    
    @Column({type: 'int', nullable: false})
    totalVendido: number;

}