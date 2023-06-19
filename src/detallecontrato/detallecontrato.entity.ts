import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'detallecontrato'})
export class DetalleContratoEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar',length: 100, nullable: false, unique: true})
    identificadorContrato: string;

    @Column({type: 'date', nullable: false})
    fechaEntregaRealizada: Date;
    
    @Column({type: 'text',nullable: false})
    descripcion: string; 
    
}