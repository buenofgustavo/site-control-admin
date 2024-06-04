import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Observable, map, startWith } from 'rxjs';
import { Acessos } from 'src/app/interface/acessos';
import { Computadores } from 'src/app/interface/computadores';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { ColaboradoresService } from 'src/app/services/departamento-pessoal/colaboradores/colaboradores.service';
import { ComputadoresService } from 'src/app/services/departamento-ti/computadores/computadores.service';
import { VincularComputadorService } from 'src/app/services/departamento-ti/vincular-computadores/vincular-computador.service';

interface Departamentos {
  value: number;
  viewValue: string;
}

interface Filiais {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-cadastro-colaborador-ti',
  templateUrl: './cadastro-colaborador-ti.component.html',
  styleUrls: ['./cadastro-colaborador-ti.component.scss']
})
export class CadastroColaboradorTiComponent {

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

  acessos: Acessos = {
    cpf: "",
    vr: "",
    gmail: "",
    freteBras: "",
    zoho: "",
    szChat: "",
    centralTi: "",
    criadoPor: "",
    atualizadoPor: ""
  }

  departamentos: Departamentos[] = [
    { value: 0, viewValue: 'T.I' },
    { value: 1, viewValue: 'Jurídico' },
    { value: 2, viewValue: 'Financeiro' },
    { value: 3, viewValue: 'Departamento Pessoal' },
    { value: 4, viewValue: 'Logística' },
    { value: 5, viewValue: 'Gerenciamento de Riscos' },
    { value: 6, viewValue: 'Ocorrências' },
    { value: 7, viewValue: 'Manutenção' },
    { value: 8, viewValue: 'Compras' },
    { value: 9, viewValue: 'Comercial' },
  ]
  
  filiais: Filiais[] = [
    { value: 0, viewValue: 'Matriz' },
    { value: 1, viewValue: 'Alexânia' },
    { value: 2, viewValue: 'Itu' },
    { value: 3, viewValue: 'Paranaguá' },
  ]

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

  


  cpf: string = '';

  buscarColaborador(){      
    const cpfSelecionado = this.dadosColaboradores.find(colaborador => colaborador.nome === this.cpf);
    if (cpfSelecionado) {
      this.cpf = cpfSelecionado.cpf;
      this.vincularComputadorService.buscarColaboradorPorCPF(this.cpf).subscribe(
        response => {
          const nome = response.nome
          this.toastrService.success(`Colaborador ${nome} encontrado!`, "Sucesso", { duration: 5000 });
        },
        error =>{
          if(error.error && error.error.message){
            this.toastrService.warning(error.error.message, "Erro");

            }
            else{
              this.toastrService.warning('Erro ao encontrar colaborador!', "Erro");
            }
        }
      )
    }
  }
desabilitar: boolean = false
buscarMac(){
  const computadorSelecionado = this.computadores2.find(computador => computador.nomeComputador === this.computadores.enderecoMac);
  if (computadorSelecionado) {
    this.desabilitar = true
    this.computadores.enderecoMac = computadorSelecionado.enderecoMac;
    this.vincularComputadorService.buscarMac(this.computadores.enderecoMac).subscribe(
    response => {
      const nomeComputador = response.nomeComputador
      const nomeUsuario = response.nomeUsuario
      this.computadores.nomeUsuario = response.nomeUsuario;
      this.computadores.nomeComputador = response.nomeComputador;
      this.computadores.marca = response.marca;
      this.computadores.modelo = response.modelo;
      this.computadores.memoriaRam = response.memoriaRam;
      this.computadores.capacidadeArmazenamento = response.capacidadeArmazenamento;
      this.computadores.makroInstalado = response.makroInstalado;
      this.toastrService.success(`Computador ${nomeComputador}, encontrado!`, "Sucesso", { duration: 5000 });
    },
    error =>{
      if(error.error && error.error.message){
        this.toastrService.warning(error.error.message, "Erro");

      }
      else{
        this.toastrService.warning('Erro ao encontrar computador!', "Erro");
      }
    }
  )
}
}

isFormEmpty(): boolean {
  if(this.validarCPF(this.cpf)){
    return false;
  }
  return true;
}

isFormEmptyVincular(): boolean {
  if(this.validarCPF(this.cpf) && this.desabilitar){
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



vincular(){
  this.desabilitar = false
  this.vincularComputadorService.vincular(this.cpf, this.computadores.enderecoMac).subscribe(
    response => {
      this.toastrService.success(`Colaborador vinculado ao computador!`, "Sucesso", { duration: 5000 });
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



  criarAcessos(){
    this.acessos.cpf = this.cpf;
    this.vincularComputadorService.criarAcessos(this.acessos).subscribe(
      response => {
        this.toastrService.success(`Acessos cadastrados com sucesso!`, "Sucesso", { duration: 5000 });
        const nome = response.nome
        const computador = response.computador
        console.log(nome, computador)
      },
      error =>{
        if(error.error && error.error.message){
          this.toastrService.warning(error.error.message, "Erro");
  
        }
        else{
          this.toastrService.warning('Erro ao cadastrar acessos!', "Erro");
        }
      }
    )
  }

  constructor(private vincularComputadorService: VincularComputadorService,
    private colaboradorService: ColaboradoresService,
    private computadoresService: ComputadoresService,
    private toastrService: NbToastrService,private router:Router
  ){
      this.inputFormControl = new FormControl();
      this.filteredClientes$ = this.inputFormControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterColaboradores(value))
      );
      this.inputFormControl2 = new FormControl();
      this.filteredClientes2$ = this.inputFormControl2.valueChanges.pipe(
        startWith(''),
        map(value2 => this.filterComputadores(value2))
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
    this.getComputadores();
  }

  computadores2:Computadores[] = [];
  filteredClientes2$: Observable<Computadores[]>;
  inputFormControl2: FormControl;

  getComputadores(): void {
    this.computadoresService.getAllComputadores().subscribe(computadores => {
      this.computadores2 = computadores;
    });
  }
  private filterComputadores(value: string): Computadores[] {
    const filterValue = value.toLowerCase();
    return this.computadores2.filter(computador => computador.nomeComputador.toLowerCase().includes(filterValue));
  }

}
