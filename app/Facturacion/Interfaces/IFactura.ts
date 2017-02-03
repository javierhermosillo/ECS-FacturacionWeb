import { IFacturaPartida } from "./../Interfaces/IFacturaPartida";
import { IReceptor } from "./../Interfaces/IReceptor";
import { IEmisor } from "./../Interfaces/IEmisor";

export interface IFactura {
    Emisor : IEmisor;
    Receptor : IReceptor;
    Partidas : IFacturaPartida[];
    Subtotal : number;
    Iva: number;
    Total : number;
}