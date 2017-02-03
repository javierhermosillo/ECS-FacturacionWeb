import { IDatosFacturacion } from "./IDatosFacturacion";
import { IDatosUsuario } from "./IDatosUsuario";

export interface IRegistroUsuario{
    datosUsuario: IDatosUsuario;
    datosFacturacion : IDatosFacturacion;
}