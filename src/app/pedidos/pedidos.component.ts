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
  carregando = signal(false);
  erro = signal<string | null>(null);
  sucesso = signal<string | null>(null);

  constructor(private pedidoService: PedidoService) {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.carregando.set(true);
    this.erro.set(null);

    this.pedidoService.listarPedidos().subscribe({
      next: (dados) => {
        this.pedidos.set(dados);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar pedidos');
        this.carregando.set(false);
      },
    });
  }

  atualizarStatusPedido(id: number, novoStatus: string) {
    this.carregando.set(true);
    this.erro.set(null);
    this.sucesso.set(null);

    this.pedidoService.atualizarStatus(id, novoStatus).subscribe({
      next: () => {
        this.sucesso.set('Status atualizado com sucesso!');
        this.carregarPedidos();
      },
      error: () => {
        this.erro.set('Erro ao atualizar status');
        this.carregando.set(false);
      },
    });
  }

  proximoStatus(statusAtual: string): string | null {
    switch (statusAtual) {
      case 'CRIADO':
        return 'EM_PREPARO';
      case 'EM_PREPARO':
        return 'EM_TRANSPORTE';
      case 'EM_TRANSPORTE':
        return 'SAIU_PARA_ENTREGA';
      case 'SAIU_PARA_ENTREGA':
        return 'ENTREGUE';
      default:
        return null;
    }
  }
}
