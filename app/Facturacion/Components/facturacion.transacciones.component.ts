import { Component, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { ITransaccionesEstacion } from "./../Interfaces/ITransaccionesEstacion";
import { ITransaccion } from "./../Interfaces/ITransaccion";
import { MetodoPagoService } from "./../../Global/Services/MetodoPago.services";
import { IMetodoPago } from "./../../Global/Interfaces/IMetodoPago";
import { PerfilUsuarioService } from "./../../Perfil/Services/perfil.usuario.service";
import { facturacionServices } from "./../Services/facturacion.services";
import { IUsuario } from "./../Interfaces/IUsuario";
import { IReceptor } from "./../Interfaces/IReceptor";
import { MessageBus } from "./../../Common/Bus/MessageBus";
import { BusService } from "./../../Common/Bus/busService";
import { ISessionExpired } from "./../../Global/Messages/Session/ISessionExpiredMessage";
import { Popover } from "ng2-popover";
import { ModalComponent } from "./../../Common/Modal/Components/modalmain.component";



@Component({
    selector: "facturacion-transaccioncomponent",
    templateUrl: "App/Facturacion/Views/facturacion.transacciones.component.html"
})
export class FacturacionTransaccionComponent implements OnInit {
    contextUsuario : IUsuario = { IdUsuario : "", Nombre: "",  ApellidoPaterno : "", ApellidoMaterno : "", Celular : "", Email : ""  };
    transaccionesAgrupadas : ITransaccionesEstacion[] = [];
    metodosPago : IMetodoPago[] = [];
    receptores : IReceptor[] = [];
    selectedReceptor : IReceptor = { IdCliente : "", Alias : "", RFC : "", RazonSocial : "", Contacto : "", Calle: "", NumeroExterior : "",
    NumeroInterior : "", Colonia: "", Localidad : "", Pais :"", CodigoPostal : "", CorreoElectronico : "", Ciudad : "", FechaCreacion : "",
    FechaModificacion : "", UsuarioModificacion : "", IdEstado : 0 };
    selectedMetodoPago : IMetodoPago = { ClaveMetodoPago : "", MetodoPago : 0, Nombre : "" };
    selectedMetodoPagoCuenta : number;
    MensajeBotonFacturar : string ="";
     
    grupoId : number;
    transaccionNoTransaccionOriginal : number;

    @ViewChild("ModalMensajeEliminar") ModalMensajeEliminar: ModalComponent;

    AbrirModalEliminar(idGrupo: number, noTransaccion : number): void{
        this.grupoId = idGrupo;
        this.transaccionNoTransaccionOriginal = noTransaccion;
        this.ModalMensajeEliminar.open();
    }

    CerrarModalEliminar() {
        this.ModalMensajeEliminar.close();
    }

    EliminarYCerrarModal(){
        this.EliminarTransaccionPrueba();
        this.ModalMensajeEliminar.close();
    }

  EliminarTransaccionPrueba() {
        let grupoTransacciones = this.transaccionesAgrupadas.find(item => item.IdGrupo == this.grupoId);
        this.facturacionService.EliminarTransaccionDeBandeja(+grupoTransacciones.Estacion.NoEstacion, this.transaccionNoTransaccionOriginal)
        .subscribe(data => {
            grupoTransacciones.Transacciones = grupoTransacciones.Transacciones.filter(tran => tran.NoTransaccionOriginal != this.transaccionNoTransaccionOriginal.toString());

            if (grupoTransacciones.Transacciones.length === 0 ) {
                if (this.transaccionesAgrupadas != undefined ) {
                    this.transaccionesAgrupadas = this.transaccionesAgrupadas.filter(group => group.IdGrupo != this.grupoId);
                }
            }
            this.RecalcularTotalesPorGrupo();
        });
    }



    // @Output() preFacturar : EventEmitter<ITransaccion[]> =  new EventEmitter<ITransaccion[]>();
    @Output() preFacturar : EventEmitter<ITransaccionesEstacion> =  new EventEmitter<ITransaccionesEstacion>();

    constructor(private metodoPagoService : MetodoPagoService, private perfilUsuario : PerfilUsuarioService, private busService : BusService, private facturacionService : facturacionServices) { }

    //Angular Pipeline
    ngOnInit() {
        this.ObtenerMetodosDePago();
        this.ObtenerPerfilUsuario();
    }

    //Metodos
    AgregarTransaccionALista(transacciones : ITransaccionesEstacion[]) {
       this.transaccionesAgrupadas = this.RealizarCalculosPosteriores(transacciones);
    }

   // EliminarTransaccion(idGrupo: number, noTransaccion : number) {
     //   let grupoTransacciones = this.transaccionesAgrupadas.find(item => item.IdGrupo == idGrupo);
       // this.facturacionService.EliminarTransaccionDeBandeja(+grupoTransacciones.Estacion.NoEstacion, noTransaccion)
        //.subscribe(data => {
          //  grupoTransacciones.Transacciones = grupoTransacciones.Transacciones.filter(tran => tran.NoTransaccionOriginal != noTransaccion.toString());

           // if (grupoTransacciones.Transacciones.length === 0 ) {
             //   if (this.transaccionesAgrupadas != undefined ) {
               //     this.transaccionesAgrupadas = this.transaccionesAgrupadas.filter(group => group.IdGrupo != idGrupo);
              //  }
           // }
            //this.RecalcularTotalesPorGrupo();
       // });
   // }

    private ObtenerMetodosDePago(){
        this.metodoPagoService.ObtenerMetodosDePago()
            .subscribe(data => {
                this.metodosPago = data;
            }, error => this.HandleError);
    }

    private ObtenerMisReceptores(idUsuario :string ){
        this.perfilUsuario.ObtenerReceptoresDeUsuario(idUsuario)
            .subscribe(data => {
                this.receptores = data;
            }, error => this.HandleError);
    }

    private ObtenerPerfilUsuario () {
        this.perfilUsuario.ObtenerPerfilUsuario()
            .subscribe(data => {
                this.contextUsuario = data;
                this.ObtenerMisReceptores(this.contextUsuario.IdUsuario);
            }, error => this.HandleError);
    }

    private EsCuentaMetodoPagoRequerido(metodoPago : IMetodoPago) {
        if (metodoPago !== undefined ) {
            if (metodoPago.ClaveMetodoPago !== ""){
                if (metodoPago.Nombre.toUpperCase() == "EFECTIVO" || metodoPago.Nombre.toUpperCase() == "DINERO ELECTRÓNICO"  || metodoPago.Nombre.toUpperCase() == "VALES DE DESPENSA" || metodoPago.Nombre.toUpperCase() == "OTROS" || metodoPago.Nombre.toUpperCase() == "NA") {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private RealizarCalculosPosteriores(transacciones : ITransaccionesEstacion[]) : ITransaccionesEstacion[] {
        let totalEnTransacciones : number  = 0;

        transacciones.forEach(grupo => {
            grupo.Transacciones.forEach(transaccion => {
                totalEnTransacciones += transaccion.Total;
            });
            grupo.TotalEnTransacciones = totalEnTransacciones;
            totalEnTransacciones = 0;
        });
        return transacciones;
    }

    private RecalcularTotalesPorGrupo() {
         let totalEnTransacciones : number  = 0;

        this.transaccionesAgrupadas.forEach(grupo => {
            grupo.Transacciones.forEach(transaccion => {
                totalEnTransacciones += transaccion.Total;
            });
            grupo.TotalEnTransacciones = totalEnTransacciones;
            totalEnTransacciones = 0;
        });
    }

    private SolicitarPreFactura(idGrupoTransacciones : number) {
        let transaccionesAFacturar = this.transaccionesAgrupadas.find(item => item.IdGrupo === idGrupoTransacciones);
        this.preFacturar.emit(transaccionesAFacturar);
    }

    private LimpiarPantalla(idGrupoTransacciones : number) {
        this.contextUsuario = { IdUsuario : "", Nombre: "",  ApellidoPaterno : "", ApellidoMaterno : "", Celular : "", Email : ""  };
        let index = this.transaccionesAgrupadas.findIndex(item => item.IdGrupo == idGrupoTransacciones);
        this.transaccionesAgrupadas.splice(index,1);
        //this.selectedMetodoPagoCuenta = null;
    //     this.selectedReceptor =  { IdCliente : "", Alias : "", RFC : "", RazonSocial : "", Contacto : "", Calle: "", NumeroExterior : "",
    // NumeroInterior : "", Colonia: "", Localidad : "", Pais :"", CodigoPostal : "", CorreoElectronico : "", Ciudad : "", FechaCreacion : "",
    // FechaModificacion : "", UsuarioModificacion : "", IdEstado : 0 };
    //     this.selectedMetodoPago = { ClaveMetodoPago : "", MetodoPago : 0, Nombre : "" };
    }

    HandleError(error : any) {
        if (error.message.indexOf("Expirada") > -1)
        {
            this.busService.channel.publish(MessageBus.Message<ISessionExpired>("ISessionExpired"), (item : ISessionExpired) => { item.body = "Expirada"; });
        };
    }

    private VerificarCuentaMetodoPago(grupoTransacciones : ITransaccionesEstacion) {
        let result : boolean = false;
        if (this.EsCuentaMetodoPagoRequerido(grupoTransacciones.MetodoPago)) {
            if (grupoTransacciones.MetodoPagoCuenta != undefined ) {
                if (grupoTransacciones.MetodoPagoCuenta.toString() === "" || (grupoTransacciones.MetodoPagoCuenta.toString().length === 4 && (/^\d+$/.test(grupoTransacciones.MetodoPagoCuenta.toString())))) {
                    result = true;
                }
            }
        } else {
            result = true;
        }
        return result;
    }

    private VerificarSeleccion(grupoTransacciones : ITransaccionesEstacion) {
        let result : boolean = true;
        if (grupoTransacciones.MetodoPago.ClaveMetodoPago !== "" && grupoTransacciones.Receptor.RFC !== "") {
            if (this.VerificarCuentaMetodoPago(grupoTransacciones)) {
                result = false;
            }
        }
        return result;
    }

    private mostrarMensajePopover(grupoTransacciones : ITransaccionesEstacion){
        if (this.VerificarSeleccion(grupoTransacciones)) {
            this.MensajeBotonFacturar = "El método de pago y el receptor son requeridos";
        }  else {
            this.MensajeBotonFacturar = "Click aqui para comenzar con el proceso de facturación";
        }
    }
}