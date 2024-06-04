import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { GestaoAtivos } from 'src/app/interface/gestaoAtivos';

@Component({
  selector: 'app-modal-visualizar-ativos-ti',
  templateUrl: './modal-visualizar-ativos-ti.component.html',
  styleUrls: ['./modal-visualizar-ativos-ti.component.scss']
})
export class ModalVisualizarAtivosTiComponent {

  constructor(private dialogRef: MatDialogRef<ModalVisualizarAtivosTiComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { gestaoAtivos: GestaoAtivos }) {
  }

}
