import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ReporteVentaProductoDto {

    

    @IsNotBlank({ message: 'el nombre del producto no puede estar vacío' })
    nombreproducto?: string;


    @IsNumber()
    @IsNotEmpty()
    @Min(0.10, { message: 'el precio debe de ser al menos de 0.10 centavos' })
    precioVenta?: number;


    @IsNumber()
    @IsNotEmpty()
    @Min(1, { message: 'el minimo de ventas realizadas de un producto debe ser 1' })
    totalVendido?: number;


}