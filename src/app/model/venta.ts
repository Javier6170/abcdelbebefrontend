import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Venta {
    id: number;
    estado: string;
    fechaCompra:Date;
    id_producto: number;
    correoUsuario: string;
    mes: number;
    direccion: string;
}
