import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { GestaoAtivos } from 'src/app/interface/gestaoAtivos';
import { GestaoAtivosService } from 'src/app/services/departamento-ti/gestao-ativos/gestao-ativos.service';

@Component({
  selector: 'app-modal-editar-ativos-ti',
  templateUrl: './modal-editar-ativos-ti.component.html',
  styleUrls: ['./modal-editar-ativos-ti.component.scss']
})
export class ModalEditarAtivosTiComponent {
  
  constructor(private dialogRef: MatDialogRef<ModalEditarAtivosTiComponent>,
    private toastrService: NbToastrService,private router:Router,
    private gestaoAtivosService: GestaoAtivosService,
    @Inject(MAT_DIALOG_DATA) public data: { gestaoAtivos: GestaoAtivos }) {
  }

  atualizar(){
    this.gestaoAtivosService.atualizarAtivos(this.data.gestaoAtivos).subscribe(
      response => {
      this.toastrService.success("Ativo atualizado com sucesso!", "Sucesso");
      setTimeout(() => {
        location.reload(); // Recarrega a página após1 segundos
      }, 1000);
      },
      error =>{
        if(error.error && error.error.message){
          this.toastrService.warning(error.error.message, "Erro");

        }
        else{
          this.toastrService.warning('Erro ao atualizar Ativo!', "Erro");
        }
      }
    )

  }

}
