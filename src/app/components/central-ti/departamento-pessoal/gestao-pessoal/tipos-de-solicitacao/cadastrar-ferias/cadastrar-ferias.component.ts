import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacaoCadastroComponent } from 'src/app/components/central-ti/modais/modais-dp/dialog/dialog-confirmacao-cadastro/dialog-confirmacao-cadastro.component';
import { DialogConfirmarFeriasComponent } from 'src/app/components/central-ti/modais/modais-dp/dialog/dialog-confirmar-ferias/dialog-confirmar-ferias.component';

interface Colaboradores {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-cadastrar-ferias',
  templateUrl: './cadastrar-ferias.component.html',
  styleUrls: ['./cadastrar-ferias.component.scss']
})
export class CadastrarFeriasComponent {

  cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];


  colaboradores: Colaboradores[] = [
    { value: 0, viewValue: 'Gustavo' },
    { value: 1, viewValue: 'João' },
    { value: 2, viewValue: 'Rikally' },
    { value: 3, viewValue: 'Fabiano' },
    { value: 4, viewValue: 'Lucas' },
    { value: 5, viewValue: 'Ítalo' },
  ]

  formControl = new FormControl(new Date());
  ngModelDate = new Date();

  mensagem: string = '';
  comentarios: string[] = [];

  enviarMensagem() {
    // Adicionar o comentário à lista de comentários
    this.comentarios.push(this.mensagem);
    
    // Limpar o campo de entrada
    this.mensagem = '';
  }
    
  constructor(private dialog: MatDialog) {}

  openConfirmar() {
    this.dialog.open(DialogConfirmarFeriasComponent);
  }
  
}
