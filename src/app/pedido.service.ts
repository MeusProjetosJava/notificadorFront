import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly API_URL = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  listarPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  atualizarStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}/status`, {
      status,
    });
  }
}