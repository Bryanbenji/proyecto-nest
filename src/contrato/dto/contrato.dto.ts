import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ContratoDto {

    
    @IsNotBlank({message: 'el identificador no puede estar vacío'})
    @MaxLength(100, {message: 'identificador: longitud máxima de 100'})
    identificador?: string;
    
    @IsNotBlank({ message: 'la fecha de inicio del contrato puede estar vacío' })
    fechaInicio?: Date;


    @IsNotBlank({ message: 'la fecha de fin del contrato no puede estar vacío' })
    fechaFin?: Date;

    @IsNotBlank({ message: 'la fecha que se en la que se realizó la entrega no puede estar vacío' })
    fechaEntregaRealizada?: Date;

    
    @IsNotBlank({ message: 'la descripción no puede estar vacío' })
    descripcion?: string;


    @IsNotBlank({ message: 'el proveedor no puede estar vacío' })
    proveedor?: string;

    
}