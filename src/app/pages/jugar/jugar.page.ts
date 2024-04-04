import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilaComponent } from 'src/app/components/fila/fila.component';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit {
  jugador: string = '';
  id: number = 0
  public nivel: any
  @ViewChildren(FilaComponent) filas!: QueryList<FilaComponent>;          
  public botonEnviarHabilitado: boolean = false;
  public filaActual: number = 0; // Variable para rastrear la fila actualmente habilitada
  public ganaste: boolean = false; // Variable para rastrear si el juego se ha ganado

  public opciones: any =[
    {id: 1, name:'Fácil',opc: 7,color: 'success'},
    {id: 2, name:'Normal',opc: 5,color: 'warning'},
    {id: 3, name:'Difícil',opc: 2,color: 'danger'},
  ]

  public iteraciones: number[] = []

  public palabras: string[] =[
    'daban','pan','dabas','nubes','palmas','cocos','dados','lucio','enanos','metas','zorro','perro','damas','hijos','limones','tigre','limones'
  ]

  public palabra: string=''
  public enviado: boolean = false;

  constructor(private route: ActivatedRoute,
    public activedRoute: ActivatedRoute,
    private router: Router
    ) { }

  enviar() {
    if (this.filaActual < this.nivel.opc - 1) {
      this.filas.toArray()[this.filaActual].verificarFila();
      this.filaActual++; // Incrementar el índice de la fila actualmente habilitada
      this.botonEnviarHabilitado = false;
    }
  }

  actualizarEstadoBotonEnviar() {
    this.botonEnviarHabilitado = this.filas.some(
      (fila) => fila.todasCeldasConLetras && !fila.verificada
    );

    // Verificar si todas las celdas de la fila actual están en acierto
    if (
      this.filas.toArray()[this.filaActual].verificada &&
      this.filas.toArray()[this.filaActual].celdas.toArray().every(
        (celda) => celda.css === 'acierto'
      )
    ) {
      // Marcar que se ha ganado el juego
      this.ganaste = true;
      setTimeout(() => {
        this.router.navigateByUrl('/nevel');
      }, 3000);
    }
  }
  

 

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
    this.jugador = params['jugador'];
    });
    this.id = this.activedRoute.snapshot.params['id']
    this.nivel = this.opciones.find((item: any) => item.id == this.id )
    this.iteraciones = Array(this.nivel.opc).fill(0).map((x,i)=>i);
    const rand = Math.ceil( Math.random()*this.palabras.length)
    this.palabra = this.palabras[rand]
    console.log(this.iteraciones)
  }
}
