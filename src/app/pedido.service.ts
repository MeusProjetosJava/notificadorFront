import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly API_URL = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  listarPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  atualizarStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.API_URL}/${id}/status`, {
      status: status,
    });
  }
}
