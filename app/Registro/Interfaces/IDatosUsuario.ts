import { IMetodoAutenticacion } from "./IMetodoAutenticacion";

export interface IDatosUsuario 
{
    nombre : string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    emailConfirmacion: string;
    celular: string;
    metodosAutenticacion : IMetodoAutenticacion []
}