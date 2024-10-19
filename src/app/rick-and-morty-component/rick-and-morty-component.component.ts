import { Component, OnInit } from '@angular/core';
import { RickAndMortyServiceService } from '../rickAndMortyService/rick-and-morty-service.service';

@Component({
  selector: 'app-rick-and-morty-component',
  templateUrl: './rick-and-morty-component.component.html',
  styleUrls: ['./rick-and-morty-component.component.css']
})
export class RickAndMortyComponentComponent implements OnInit {
  title = 'RickAndMortyAPI';
  listaPersonajes: any[] = [];
  listaUbicaciones: any[] = [];
  searchTerm: string = '';
  mostrarUbicaciones: boolean = false;
  tipoVista: 'personajes' | 'ubicaciones' = 'personajes';
  nextPageCharacters: string = '';
  prevPageCharacters: string = '';
  nextPageLocations: string = '';
  prevPageLocations: string = '';

  constructor(private rickAndMortyService: RickAndMortyServiceService) {}

  ngOnInit(): void {
    this.obtenerPersonajes();
  }

  obtenerPersonajes(pagina: number = 1): void {
    this.rickAndMortyService.obtenerPersonajes(pagina).subscribe((data) => {
      this.listaPersonajes = data.results;
      this.nextPageCharacters = data.info.next;
      this.prevPageCharacters = data.info.prev;
      this.tipoVista = 'personajes';
    });
  }

  seleccionarPersonaje(name: string): void {
    this.rickAndMortyService.seleccionarPersonaje(name).subscribe((data) => {
      this.listaPersonajes = data.results;
    });
  }

  obtenerUbicaciones(pagina: number = 1): void {
    this.rickAndMortyService.obtenerUbicaciones(pagina).subscribe((data) => {
      this.listaUbicaciones = data.results;
      this.nextPageLocations = data.info.next;
      this.prevPageLocations = data.info.prev;
      this.mostrarUbicaciones = true;
      this.tipoVista = 'ubicaciones';
    });
  }

  volverInicio(): void {
    this.mostrarUbicaciones = false;
    this.obtenerPersonajes();
  }

  navegarHaciaPagina(pagina: string, tipo: string): void {
    if (pagina) {
      if (tipo === 'personajes') {
        this.rickAndMortyService.navegarHaciaPagina(pagina).subscribe((data) => {
          this.listaPersonajes = data.results;
          this.nextPageCharacters = data.info.next;
          this.prevPageCharacters = data.info.prev;
        });
      } else if (tipo === 'ubicaciones') {
        this.rickAndMortyService.navegarHaciaPagina(pagina).subscribe((data) => {
          this.listaUbicaciones = data.results;
          this.nextPageLocations = data.info.next;
          this.prevPageLocations = data.info.prev;
        });
      }
    }
  }

  siguiente(tipo: string): void {
    if (tipo === 'personajes') {
      this.navegarHaciaPagina(this.nextPageCharacters, 'personajes');
    } else if (tipo === 'ubicaciones') {
      this.navegarHaciaPagina(this.nextPageLocations, 'ubicaciones');
    }
  }

  anterior(tipo: string): void {
    if (tipo === 'personajes') {
      this.navegarHaciaPagina(this.prevPageCharacters, 'personajes');
    } else if (tipo === 'ubicaciones') {
      this.navegarHaciaPagina(this.prevPageLocations, 'ubicaciones');
    }
  }
}
