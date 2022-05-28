import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Venta {
    id: number;
    estado: string;
    fechaCompra:Date;
    producto: Producto;
    usuario: Usuario;
}
