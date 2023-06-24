import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ReporteContratoDto {

    
    @IsString()
    @MaxLength(13, {message: 'ruc: longitud máxima de 13 digitos'})
    ruc?: string;
    
    @IsNotBlank({message: 'el proveedor no puede estar vacío'})
    @MaxLength(100, {message: 'nombreproveedor: longitud máxima de 100'})
    nombreproveedor?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0, { message: 'la cantidad de contratos debe de ser positivo' })
    cantidadcontratos?: number;
    
    @IsNotBlank({ message: 'la fecha de inicio del contrato no puede estar vacío' })
    fechaInicio?: Date;


    @IsNotBlank({ message: 'la fecha de fin del contrato no puede estar vacío' })
    fechaFin?: Date;


    
}