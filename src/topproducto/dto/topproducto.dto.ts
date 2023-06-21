import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class TopProductoDto {

    

    @IsNotBlank({ message: 'el nombre no puede estar vacío' })
    nombre?: string;

    @IsNotBlank({ message: 'debe ingresar una imagen' })
    imagenUrl?: string;

    @IsNotBlank({ message: 'la descripcion no puede estar vacío' })
    descripcion?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0, { message: 'el puntaje debe de ser positivo' })
    puntaje?: number;

    @IsNotBlank({ message: 'la rentabilidad no puede estar vacío' })
    rentabilidad?: string;


}