import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private apiUrl = 'http://127.0.0.1:8000/api'
  private apiUrl2 = 'http://127.0.0.1:8000/api/record'
  constructor(private http: HttpClient) { }
  
  obtenerRecords(): Observable<any> {
    return this.http.get(`${this.apiUrl}/records`);
  }

  obtenerRecordsTop(): Observable<any> {
    return this.http.get(`${this.apiUrl}/top-records`);
  }
  obtenerRecordsId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl2}/${id}`);
  }

  
  //crear
  crearRecord(record: any): Observable<any> {
    return this.http.post(this.apiUrl2, record);
  }
  // Actualizar un registro existente
  actualizarRecord(id: number, record: any): Observable<any> {
    return this.http.put(`${this.apiUrl2}/${id}`, record);
  }

  // Eliminar un registro
  eliminarRecord(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/records/${id}`);
  }

}