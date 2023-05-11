import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CategoriaDto {

    @IsNotBlank({message: 'el tipo de categoria no puede estar vacío'})
    tipoCategoria?: string;

    @IsNotBlank({message: 'la descripcion no puede estar vacío'})
    descripcion?: string;

    
}