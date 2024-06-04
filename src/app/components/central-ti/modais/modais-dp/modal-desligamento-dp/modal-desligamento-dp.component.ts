import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject  } from '@angular/core';

@Component({
  selector: 'app-modal-desligamento-dp',
  templateUrl: './modal-desligamento-dp.component.html',
  styleUrls: ['./modal-desligamento-dp.component.scss']
})
export class ModalDesligamentoDpComponent {
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