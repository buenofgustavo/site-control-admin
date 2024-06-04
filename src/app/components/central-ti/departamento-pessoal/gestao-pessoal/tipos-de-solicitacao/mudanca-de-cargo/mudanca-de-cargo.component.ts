import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { DialogConfirmarDesligamentoComponent } from 'src/app/components/central-ti/modais/modais-dp/dialog/dialog-confirmar-desligamento/dialog-confirmar-desligamento.component';
import { DialogMudancaCargoComponent } from 'src/app/components/central-ti/modais/modais-dp/dialog/dialog-mudanca-cargo/dialog-mudanca-cargo.component';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { ColaboradoresService } from 'src/app/services/departamento-pessoal/colaboradores/colaboradores.service';
import { MudancaDeCargoService } from 'src/app/services/departamento-pessoal/mudanca-cargo/mudanca-de-cargo.service';
import { startWith, map } from 'rxjs/operators';
import { DepartamentoFiliaisService } from 'src/app/services/select-departamentos-filiais/departamento-filiais.service';
import { Departamentos } from 'src/app/interface/departamento';
import { Filiais } from 'src/app/interface/filiais';



@Component({
  selector: 'app-mudanca-de-cargo',
  templateUrl: './mudanca-de-cargo.component.html',
  styleUrls: ['./mudanca-de-cargo.component.scss']
})
export class MudancaDeCargoComponent {

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  mensagem: string = '';
  comentarios: string[] = [];

  enviarMensagem() {
    // Adicionar o comentário à lista de comentários
    this.comentarios.push(this.mensagem);
    
    // Limpar o campo de entrada
    this.mensagem = '';
  }

  filteredClientes$: Observable<DadosColaboradores[]>;
  inputFormControl: FormControl;
  dadosColaboradores: DadosColaboradores = {
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

  isFormEmpty(): boolean {
    

      const inputs: (keyof DadosColaboradores)[] = ['cpf', 'cargo', 'filial', 'departamento', 'regimeContratacao'];
      return inputs.some(field => !this.dadosColaboradores[field]);

  }

  validarCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || cpf.match(/^(.)\1*$/)) {
        return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida
    }

    // Calcula o primeiro dígito verificador
    var sum = 0;
    for (var i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var remainder = 11 - (sum % 11);
    var firstDigit = remainder === 10 || remainder === 11 ? 0 : remainder;

    // Verifica o primeiro dígito verificador
    if (parseInt(cpf.charAt(9)) !== firstDigit) {
        return false;
    }

    // Calcula o segundo dígito verificador
    sum = 0;
    for (var i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    var secondDigit = remainder === 10 || remainder === 11 ? 0 : remainder;

    // Verifica o segundo dígito verificador
    if (parseInt(cpf.charAt(10)) !== secondDigit) {
        return false;
    }

    return true;
}

  buscarColaborador(){      

    this.mudancaDeCargoService.buscarColaboradorPorCPF(this.dadosColaboradores.cpf).subscribe(
      response => {
        const nome = response.nome
        this.toastrService.success(`Colaborador ${nome} encontrado!`, "Sucesso", { duration: 5000 });
      },
      error => {
        if (error.status === 403) {
          // Se o erro for 403, recarregue a página
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          if (error.error && error.error.message) {
            this.toastrService.warning(error.error.message, "Erro");
          } else {
            this.toastrService.warning('Erro ao encontrar colaborador!', "Erro");
          }
        }
      }
    )
  }

  mudancaCargo(){
    const cpfSelecionado = this.dadosColaboradores2.find(colaborador => colaborador.nome === this.dadosColaboradores.cpf);
    if (cpfSelecionado) {
      this.dadosColaboradores.cpf = cpfSelecionado.cpf;
      this.mudancaDeCargoService.mudancaCargo(this.dadosColaboradores).subscribe(
      response => {
        this.toastrService.success("Mudança de cargo cadastrada com sucesso!", "Sucesso");
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
            this.toastrService.warning('Erro ao mudar cargo do colaborador!', "Erro");
          }
        }
      }
    )
  }

  }

  departamento: Departamentos[] = [];
  
  filial: Filiais[] = [];

  getFiliais(): void {
    this.departamentoFiliaisService.getAllFiliais().subscribe(filiais => {
      this.filial = filiais.sort((a, b) => {
        return a.filiais.localeCompare(b.filiais);
      });      
      console.log(filiais);
    });
  }

  getDepartamentos(): void {
    this.departamentoFiliaisService.getAllDepartamentos().subscribe(departamentos => {
      this.departamento = departamentos.sort((a, b) => {
        return a.departamento.localeCompare(b.departamento);
      });      
      console.log(departamentos);
    });
  }


  constructor(
    private mudancaDeCargoService: MudancaDeCargoService,
    private colaboradorService: ColaboradoresService,
    private departamentoFiliaisService: DepartamentoFiliaisService,
    private toastrService: NbToastrService,
    private router: Router
  ) {
    this.inputFormControl = new FormControl();
    this.filteredClientes$ = this.inputFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterColaboradores(value))
    );
  }
  
  dadosColaboradores2:DadosColaboradores[] = [];

  getColaboradores(): void {
    this.colaboradorService.getAllDadosColaboradores().subscribe(colaboradores => {
      this.dadosColaboradores2 = colaboradores;
    });
  }
  
  private filterColaboradores(value: string): DadosColaboradores[] {
    const filterValue = value.toLowerCase();
    return this.dadosColaboradores2.filter(colaborador => colaborador.nome.toLowerCase().includes(filterValue));
  }
  
  ngOnInit() {
    this.getColaboradores();
    this.getFiliais();
    this.getDepartamentos();
  }

}
