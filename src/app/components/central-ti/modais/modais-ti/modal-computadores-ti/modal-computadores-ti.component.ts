import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { Computadores } from 'src/app/interface/computadores';
import { ComputadoresService } from 'src/app/services/departamento-ti/computadores/computadores.service';

@Component({
  selector: 'app-modal-computadores-ti',
  templateUrl: './modal-computadores-ti.component.html',
  styleUrls: ['./modal-computadores-ti.component.scss']
})
export class ModalComputadoresTiComponent {

  constructor(private dialogRef: MatDialogRef<ModalComputadoresTiComponent>,
    private toastrService: NbToastrService,
    private computadoresService: ComputadoresService,
    @Inject(MAT_DIALOG_DATA) public data: { computadoresCompleto: Computadores }) {
    console.log(data)
  }



  salvarSerial() {
    this.computadoresService.salvarSerial(this.data.computadoresCompleto.enderecoMac, this.data.computadoresCompleto.serial).subscribe(
      response => {
        this.toastrService.success("Ativo atualizado com sucesso!", "Sucesso");
        setTimeout(() => {
          location.reload(); // Recarrega a página após1 segundos
        }, 1000);
      },
      error => {
        if (error.error && error.error.message) {
          this.toastrService.warning(error.error.message, "Erro");

        }
        else {
          this.toastrService.warning('Erro ao atualizar Ativo!', "Erro");
        }
      }
    )
  }

  salvarStatus() {
    this.computadoresService.salvarStatus(this.data.computadoresCompleto.enderecoMac, this.data.computadoresCompleto.status).subscribe(
      response => {
        this.toastrService.success("Ativo atualizado com sucesso!", "Sucesso");
        setTimeout(() => {
          location.reload(); // Recarrega a página após1 segundos
        }, 1000);
      },
      error => {
        if (error.error && error.error.message) {
          this.toastrService.warning(error.error.message, "Erro");

        }
        else {
          this.toastrService.warning('Erro ao atualizar Ativo!', "Erro");
        }
      }
    )
  }



}
