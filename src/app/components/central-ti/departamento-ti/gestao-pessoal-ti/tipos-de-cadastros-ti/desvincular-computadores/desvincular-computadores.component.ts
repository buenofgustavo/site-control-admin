import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { Computadores } from 'src/app/interface/computadores';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { ColaboradoresService } from 'src/app/services/departamento-pessoal/colaboradores/colaboradores.service';
import { DesvincularComputadorService } from 'src/app/services/departamento-ti/desvincular-computadores/desvincular-computador.service';



@Component({
  selector: 'app-desvincular-computadores',
  templateUrl: './desvincular-computadores.component.html',
  styleUrls: ['./desvincular-computadores.component.scss']
})
export class DesvincularComputadoresComponent {
  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  computadores: Computadores = {
    nomeUsuario: "",
    nomeComputador: "",
    localizacao: "",
    memoriaRam: "",
    capacidadeArmazenamento: "",
    marca: "",
    modelo: "",
    processador: "",
    sistemaOperacional: "",
    makroInstalado: "",
    versaoMakro: "",   
    enderecoMac: "",
    userAtual: "",
    lastUser: "",
    nomeUserAtual: "",
    nomeLastUser: ""
  }



  inputItemFormControl = new FormControl();
  textareaItemFormControl = new FormControl();
  
  imagemSelecionadaTermo: File | null = null
  anexarTermo(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imagemSelecionadaTermo = event.target.files[0];
    }
  }

  imagemSelecionadaContrato: File | null = null
  anexarContrato(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imagemSelecionadaContrato = event.target.files[0];
    }
  }

  isFormEmpty(): boolean {
    if(this.validarCPF(this.cpf)){
      return false;
    }
    return true;
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





  cpf: string = '';
  buscarColaborador() {
    // Verifica se o CPF foi fornecido

  
    const cpfSelecionado = this.dadosColaboradores.find(colaborador => colaborador.nome === this.cpf);
    if (cpfSelecionado) {
      this.cpf = cpfSelecionado.cpf;
      this.desvincularComputadorService.buscarColaboradorPorCPF(this.cpf).subscribe(
        colaboradorResponse => {
          // Obtém o objeto this.computador da resposta do serviço de colaborador
          const computador = colaboradorResponse.computador;
        
          // Realiza a chamada assíncrona para buscar o MAC
          this.desvincularComputadorService.buscarMac(computador).subscribe(
            macResponse => {
              // Processa a resposta do serviço de colaborador
              const nome = colaboradorResponse.nome;
              this.toastrService.success(`Colaborador ${nome} encontrado!`, 'Sucesso', { duration: 5000 });
            
              // Preenche os campos do computador com a resposta do serviço de MAC
              this.computadores.enderecoMac = macResponse.enderecoMac;
              this.computadores.nomeUsuario = macResponse.nomeUsuario;
              this.computadores.nomeComputador = macResponse.nomeComputador;
              this.computadores.marca = macResponse.marca;
              this.computadores.modelo = macResponse.modelo;
              this.computadores.memoriaRam = macResponse.memoriaRam;
              this.computadores.capacidadeArmazenamento = macResponse.capacidadeArmazenamento;
              this.computadores.makroInstalado = macResponse.makroInstalado;
            },
            error => {
              // Trata erros na busca do MAC
              if (error.error && error.error.message) {
                this.toastrService.warning(error.error.message, 'Erro');
              } else {
                this.toastrService.warning('Erro ao encontrar o MAC!', 'Erro');
              }
            }
          );
        },
        error => {
          // Trata erros na busca do colaborador por CPF
          if (error.error && error.error.message) {
            this.toastrService.warning(error.error.message, 'Erro');
          } else {
            this.toastrService.warning('Erro ao encontrar colaborador!', 'Erro');
          }
        }
      );
    }
  }

  desvincular(){
    this.desvincularComputadorService.desvincular(this.cpf).subscribe(
      response => {
        this.toastrService.success(`Colaborador desvinculado ao computador!`, "Sucesso", { duration: 5000 });
        const nome = response.nome
        const computador = response.computador
        console.log(nome, computador)
      },
      error =>{
        if(error.error && error.error.message){
          this.toastrService.warning(error.error.message, "Erro");
  
        }
        else{
          this.toastrService.warning('Erro ao vincular computador ao colaborador!', "Erro");
        }
      }
    )
  }

  constructor(private desvincularComputadorService: DesvincularComputadorService,
    private toastrService: NbToastrService,private router : Router,   
    private colaboradorService: ColaboradoresService
  ){
      this.inputFormControl = new FormControl();
      this.filteredClientes$ = this.inputFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterColaboradores(value))
      );
  }
  
  dadosColaboradores:DadosColaboradores[] = [];
  filteredClientes$: Observable<DadosColaboradores[]>;
  inputFormControl: FormControl;

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