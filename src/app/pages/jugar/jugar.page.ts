import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilaComponent } from 'src/app/components/fila/fila.component';
import { ViewChild, ElementRef } from '@angular/core';


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
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef;
         
  public botonEnviarHabilitado: boolean = false;
  public filaActual: number = 0; // Variable para rastrear la fila actualmente habilitada
  public ganaste: boolean = false; // Variable para rastrear si el juego se ha ganado
  public perdiste: boolean = false;

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
      if (this.filaActual < this.nivel.opc) {
        this.filas.toArray()[this.filaActual].verificarFila();
        this.filaActual++; // Incrementar el índice de la fila actualmente habilitada
        // Verificar si es la última fila para activar el botón de enviar
        if (this.filaActual === this.nivel.opc) {
          if (!this.filas.toArray()[this.filaActual - 1].celdas.toArray().every(celda => celda.css === 'acierto')) {
            // Si no todas las celdas de la última fila están en acierto, mostrar mensaje de "Perdiste"
            this.perdiste = true;
            setTimeout(() => {
              this.router.navigate(['/nevel'], { queryParams: { jugador: this.jugador } }); // Redireccionar a la página "nevel" y pasar el jugador como parámetro
            }, 3000);
          } else {
            this.botonEnviarHabilitado = true;
          }
        }
      } else {
        console.log("¡Última fila alcanzada!");
      }
    }
    
    

  actualizarEstadoBotonEnviar() {
    console.log('Fila actual:', this.filaActual);
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
        this.router.navigate(['/nevel'], { queryParams: { jugador: this.jugador } }); // Navega a la página "nevel" y pasa el jugador como parámetro
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
    localStorage.setItem('jugador', this.jugador);
  }

  ngAfterViewInit() {
    // Reproducir el audio después de que la vista se haya inicializado
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.play();
    }
  }

  ngOnDestroy() {
    // Detener la reproducción cuando la página se destruye
    if (this.audioPlayer) {
      this.audioPlayer.nativeElement.pause();
    }
  }
}
