import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ItemPerdidoService } from '../../../core/services/item-perdido.service';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css'
})
export class FormularioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ItemPerdidoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id: number | null = null;
  erroApi = signal('');

  form = this.fb.nonNullable.group({
    nomeItem: ['', [Validators.required, Validators.minLength(3)]],
    localEncontrado: ['', Validators.required],
    dataAchado: ['', Validators.required],
    descricaoDevolucao: ['']
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.service.buscarPorId(this.id).subscribe({
        next: item => this.form.patchValue(item),
        error: e => this.erroApi.set(e.message)
      });
    }
  }

  invalido(campo: string) {
    const c = this.form.get(campo);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dados = this.form.getRawValue();
    const req = this.id
      ? this.service.atualizar(this.id, dados)
      : this.service.cadastrar(dados);

    req.subscribe({
      next: () => {
        alert('Registro salvo com sucesso!');
        this.router.navigate(['/']);
      },
      error: e => this.erroApi.set('Erro: ' + e.message)
    });
  }
}