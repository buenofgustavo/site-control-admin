import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { DialogMudancaCargoComponent } from 'src/app/components/central-ti/modais/modais-dp/dialog/dialog-mudanca-cargo/dialog-mudanca-cargo.component';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { ColaboradoresService } from 'src/app/services/departamento-pessoal/colaboradores/colaboradores.service';
import { DesligarColaboradorService } from 'src/app/services/departamento-pessoal/desligamento-colaborador/desligar-colaborador.service';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-solicitar-desligamento',
  templateUrl: './solicitar-desligamento.component.html',
  styleUrls: ['./solicitar-desligamento.component.scss']
})
export class SolicitarDesligamentoComponent {

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  cpf: string = '';

  desabilitar: boolean = false

  dadosColaboradores2: DadosColaboradores = {
    usuario_solicitante: "",
    nome: "",
    numero: "",
    cpf: "",
    filial: "",
    cargo: "",
    departamento: "",
    computador: null,
    atualizado_por: "",
    termo: false,
    regimeContratacao: "",
    status: true,
  }

  dadosColaboradores:DadosColaboradores[] = [];
  filteredClientes$: Observable<DadosColaboradores[]>;
  inputFormControl: FormControl;




  
  isFormEmptyDesligar(): boolean {
    if(this.desabilitar){
      return false;
    }
    return true;
  }

  mensagem: string = '';
  comentarios: string[] = [];

  enviarMensagem() {
    // Adicionar o comentário à lista de comentários
    this.comentarios.push(this.mensagem);
    
    // Limpar o campo de entrada
    this.mensagem = '';
  }


  desligar(){   
      this.desabilitar = false   
      this.desligarColaboradorService.desligar(this.dadosColaboradores2.cpf).subscribe(
      response => {
        this.toastrService.success(`Colaborador foi desligado!`, "Sucesso", { duration: 5000 });
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/gestao-pessoal']); // Navega para a rota de cadastro de armazém
          });
          }, 1000); 
      },
      error => {
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          if (error.error && error.error.message) {
            this.toastrService.warning(error.error.message, "Erro");
          } else {
            this.toastrService.warning('Erro ao desligar colaborador!', "Erro");
          }
        }
      }
    )
  }

  buscarColaborador(){      
    const cpfSelecionado = this.dadosColaboradores.find(colaborador => colaborador.nome === this.dadosColaboradores2.cpf);
    if (cpfSelecionado) {

      this.desabilitar = true
      this.dadosColaboradores2.cpf = cpfSelecionado.cpf;
      this.dadosColaboradores2.nome = cpfSelecionado.nome
      this.dadosColaboradores2.computador = cpfSelecionado.computador
      this.dadosColaboradores2.departamento = cpfSelecionado.departamento
      this.dadosColaboradores2.filial = cpfSelecionado.filial
      this.dadosColaboradores2.cargo = cpfSelecionado.cargo
      this.dadosColaboradores2.regimeContratacao = cpfSelecionado.regimeContratacao
      this.dadosColaboradores2.termo = cpfSelecionado.termo
    }
  }

  constructor(
    private desligarColaboradorService: DesligarColaboradorService,
    private colaboradorService: ColaboradoresService,
    private toastrService: NbToastrService,
    private router: Router
  ) {
    this.inputFormControl = new FormControl();
    this.filteredClientes$ = this.inputFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterColaboradores(value))
    );
  }
  
  getColaboradores(): void {
    this.colaboradorService.getAllDadosColaboradores().subscribe(colaboradores => {
      this.dadosColaboradores = colaboradores;
    });
  }
  
  private filterColaboradores(value: string): DadosColaboradores[] {
    const filterValue = value.toLowerCase();
    return this.dadosColaboradores.filter(colaborador => colaborador.nome.toLowerCase().includes(filterValue));
  }
  
  ngOnInit() {
    this.getColaboradores();
  }

}