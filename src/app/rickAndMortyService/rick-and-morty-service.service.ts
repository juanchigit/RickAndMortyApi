import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyServiceService {
  private baseUrl: string = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  obtenerPersonajes(pagina: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/character?page=${pagina}`);
  }

  obtenerUbicaciones(pagina: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/location?page=${pagina}`);
  }

  seleccionarPersonaje(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/character?name=${name}`);
  }

  navegarHaciaPagina(pagina: string): Observable<any> {
    return this.http.get<any>(pagina);
  }
}
