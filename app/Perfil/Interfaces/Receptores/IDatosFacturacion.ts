import { IDatoFiscal } from "./IDatoFiscal";
import { IDomicilioFiscal } from "./IDomicilioFiscal";

export interface IDatosFacturacion {
    datosFiscales : IDatoFiscal;
    domicilioFiscal : IDomicilioFiscal;
    emailsReceptor : string;
}