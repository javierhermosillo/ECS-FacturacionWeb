import { IEstacion } from "./../Interfaces/IEstacion";
import { IProducto } from "./../Interfaces/IProducto";

export interface ITransaccion {
    IdTransaccion : string;
    NoTransaccionOriginal : string;
    Cantidad : number;
    Precio : number;
    IVA: number;
    IEPS: number;
    Total: number;
    FechaCreacion : Date;
    Estacion : IEstacion;
    Productos : IProducto[];
}