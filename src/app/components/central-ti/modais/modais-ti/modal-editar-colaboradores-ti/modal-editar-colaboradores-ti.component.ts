import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { ModalColaboradoresDpComponent } from '../../modais-dp/modal-colaboradores-dp/modal-colaboradores-dp.component';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';
import { VincularComputadorService } from 'src/app/services/departamento-ti/vincular-computadores/vincular-computador.service';

@Component({
  selector: 'app-modal-editar-colaboradores-ti',
  templateUrl: './modal-editar-colaboradores-ti.component.html',
  styleUrls: ['./modal-editar-colaboradores-ti.component.scss']
})
export class ModalEditarColaboradoresTiComponent {

  constructor(private dialogRef: MatDialogRef<ModalColaboradoresDpComponent>,
    private toastrService: NbToastrService,
    private vincularComputadorService: VincularComputadorService,
    @Inject(MAT_DIALOG_DATA) public data: { colaboradorCompleto: ColaboradorCompleto }) {
      console.log(data)
  }

  criarAcessos(){
    
    this.vincularComputadorService.criarAcessos(this.data.colaboradorCompleto.acessosDTO).subscribe(
      response => {
        this.toastrService.success(`Acessos atualizados com sucesso!`, "Sucesso", { duration: 5000 });
        setTimeout(() => {
          location.reload(); // Recarrega a página após1 segundos
        }, 2000);
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

}
