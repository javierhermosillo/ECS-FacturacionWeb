import { IMetodoAutenticacion } from "./IMetodosAutenticacion";

export interface IDatosActualizacionUsuario 
{
    nombre : string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    emailConfirmacion: string;
    celular: string;
    metodosAutenticacion : IMetodoAutenticacion [];
}