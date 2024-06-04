import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject  } from '@angular/core';
@Component({
  selector: 'app-modal-ferias-dp',
  templateUrl: './modal-ferias-dp.component.html',
  styleUrls: ['./modal-ferias-dp.component.scss']
})
export class ModalFeriasDpComponent {
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

  dados: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dados = data.dados;
  }
}

