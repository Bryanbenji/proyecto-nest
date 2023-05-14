import { IsEmail, IsString, MaxLength } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class ProveedorDto {


    @IsString()
    @MaxLength(13, {message: 'ruc: longitud máxima de 13 digitos'})
    ruc?: string;

    @IsNotBlank({message: 'el nombre de proveedor no puede estar vacío'})
    @MaxLength(80, {message: 'nombre de proveedor: longitud máxima de 80 caracteres'})
    nombre?: string;

    @IsNotBlank({message: 'el telefono no puede estar vacío'})
    @MaxLength(10, {message: 'telefono: longitud máxima de 10'})
    telefono?: string;

    @IsEmail()
    email?: string;

    

}