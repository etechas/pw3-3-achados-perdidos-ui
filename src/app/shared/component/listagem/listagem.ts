import { Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemPerdido, StatusItem } from '../../../core/models/item-perdido';
import { ItemPerdidoService } from '../../../core/services/item-perdido.service';

@Component({
  selector: 'app-listagem',
  imports: [RouterLink, DatePipe],
  templateUrl: './listagem.html',
  styleUrl: './listagem.css'
})
export class ListagemComponent implements OnInit {
  private service = inject(ItemPerdidoService);

  itens = signal<ItemPerdido[]>([]);
  filtro = signal<StatusItem | ''>('');
  mensagem = signal<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listar(this.filtro() || undefined).subscribe({
      next: itens => this.itens.set(itens),
      error: e => this.mensagem.set({ tipo: 'erro', texto: e.message })
    });
  }

  filtrar(valor: string) {
    this.filtro.set(valor as StatusItem | '');
    this.carregar();
  }

  mudarStatus(item: ItemPerdido, novo: StatusItem) {
    this.service.atualizarStatus(item.id!, novo).subscribe({
      next: () => {
        this.mensagem.set({ tipo: 'sucesso', texto: `Status alterado para ${novo}.` });
        this.carregar();
      },
      error: e => this.mensagem.set({ tipo: 'erro', texto: 'Erro: ' + e.message })
    });
  }

  excluir(item: ItemPerdido) {
    if (!confirm(`Excluir "${item.nomeItem}"?`)) return;
    this.service.excluir(item.id!).subscribe({
      next: () => {
        this.mensagem.set({ tipo: 'sucesso', texto: 'Item excluído com sucesso!' });
        this.carregar();
      },
      error: e => this.mensagem.set({ tipo: 'erro', texto: 'Erro: ' + e.message })
    });
  }
}