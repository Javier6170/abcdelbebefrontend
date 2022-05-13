import { Categoria } from "./categoria";

export class Usuario {
    id:number;
    nombre:string;
    telefono:number;
    correo:string;
    password:string
    nombre_imagen: string;
    retreieve_image: any;
    categoria: Categoria;
}
