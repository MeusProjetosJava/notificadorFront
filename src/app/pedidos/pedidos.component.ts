import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css'],
})
export class PedidosComponent {
  pedidos = signal<any[]>([]);

  constructor(private pedidoService: PedidoService) {
    console.log('Chamando o backend...');
    this.pedidoService.listarPedidos().subscribe((dados) => {
      console.log('Dados recebidos do backend:', dados);
      this.pedidos.set(dados);
    });
  }
}
