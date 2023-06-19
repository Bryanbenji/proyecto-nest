import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class DetalleContratoDto {

    
    @IsNotBlank({message: 'el identificador no puede estar vacío'})
    @MaxLength(100, {message: 'identificador: longitud máxima de 100'})
    identificadorContrato?: string;
    

    @IsNotBlank({ message: 'la fecha que se en la que se realizó la entrega no puede estar vacío' })
    fechaEntregaRealizada?: Date;

    
    @IsNotBlank({ message: 'la descripción no puede estar vacío' })
    descripcion?: string;



    
}