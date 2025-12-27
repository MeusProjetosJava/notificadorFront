import { bootstrapApplication } from '@angular/platform-browser';
import { PedidosComponent } from './app/pedidos/pedidos.component';

bootstrapApplication(PedidosComponent)
  .catch(err => console.error(err));
