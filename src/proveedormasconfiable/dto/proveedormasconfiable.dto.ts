import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProveedorMasConfiableDto {

    

    @IsNotBlank({ message: 'el ruc no puede estar vacío' })
    ruc?: string;

    @IsNotBlank({message: 'el nombre de proveedor no puede estar vacío'})
    nombreproveedor?: string;

    @IsNotBlank({ message: 'el producto no puede estar vacío' })
    producto?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0, { message: 'el puntaje debe de ser positivo' })
    puntaje?: number;

    @IsNotBlank({ message: 'el apartado de recindir contrato no puede estar vacío' })
    recindir?: string;


}