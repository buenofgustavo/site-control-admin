import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mudanca-de-cargo-dp',
  templateUrl: './modal-mudanca-de-cargo-dp.component.html',
  styleUrls: ['./modal-mudanca-de-cargo-dp.component.scss']
})
export class ModalMudancaDeCargoDpComponent {
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
