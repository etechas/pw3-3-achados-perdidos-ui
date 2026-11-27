import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ItemPerdido, StatusItem } from '../models/item-perdido';

@Injectable({ providedIn: 'root' })
export class ItemPerdidoService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/api/itens';

  private tratarErro = (err: HttpErrorResponse) => {
    const msg =
      err.status === 0
        ? 'Não foi possível conectar ao servidor.'
        : (err.error?.mensagem ?? `Erro inesperado (HTTP ${err.status}).`);
    return throwError(() => new Error(msg));
  };

  listar(status?: StatusItem): Observable<ItemPerdido[]> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<ItemPerdido[]>(this.api, { params }).pipe(catchError(this.tratarErro));
  }

  buscarPorId(id: number): Observable<ItemPerdido> {
    return this.http.get<ItemPerdido>(`${this.api}/${id}`).pipe(catchError(this.tratarErro));
  }

  cadastrar(item: ItemPerdido): Observable<ItemPerdido> {
    return this.http.post<ItemPerdido>(this.api, item).pipe(catchError(this.tratarErro));
  }

  atualizar(id: number, item: ItemPerdido): Observable<ItemPerdido> {
    return this.http.put<ItemPerdido>(`${this.api}/${id}`, item).pipe(catchError(this.tratarErro));
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`).pipe(catchError(this.tratarErro));
  }

  atualizarStatus(id: number, status: StatusItem): Observable<ItemPerdido> {
    return this.http
      .patch<ItemPerdido>(`${this.api}/${id}/status`, { status })
      .pipe(catchError(this.tratarErro));
  }
}