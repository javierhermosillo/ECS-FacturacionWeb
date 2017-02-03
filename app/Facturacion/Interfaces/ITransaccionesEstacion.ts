import { IEstacion } from "./../Interfaces/IEstacion";
import { ITransaccion } from "./../Interfaces/ITransaccion";
import { IMetodoPago } from "./../../Global/Interfaces/IMetodoPago";
import { IReceptor } from "./../Interfaces/IReceptor";

export interface ITransaccionesEstacion {
    Estacion : IEstacion;
    IdGrupo : number;
    Transacciones : ITransaccion[];
    TotalEnTransacciones : number;
    MetodoPago : IMetodoPago;
    MetodoPagoCuenta : string;
    Receptor : IReceptor;
}