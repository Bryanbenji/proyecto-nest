import { IsInt, IsNotEmpty, IsNumber, Min } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProductoDto {

    

    @IsNotBlank({ message: 'el nombre no puede estar vacío' })
    nombre?: string;

    @IsNotBlank({ message: 'el nombre no puede estar vacío' })
    descripcion?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.10, { message: 'el precio debe de ser al menos de 0.10 centavos' })
    precioVenta?: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.10, { message: 'el precio debe de ser al menos de 0.10 centavos' })
    precioCompra?: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1, { message: 'el minimo de ventas realizadas de un producto debe ser 1' })
    totalVendido?: number;

    @IsNumber()
    @IsNotEmpty()
    categoriaId ?: number;

}