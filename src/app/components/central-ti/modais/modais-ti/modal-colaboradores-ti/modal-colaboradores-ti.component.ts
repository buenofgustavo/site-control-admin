import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalColaboradoresDpComponent } from '../../modais-dp/modal-colaboradores-dp/modal-colaboradores-dp.component';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';
import { NbToastrService } from '@nebular/theme';
import { VincularComputadorService } from 'src/app/services/departamento-ti/vincular-computadores/vincular-computador.service';

@Component({
  selector: 'app-modal-colaboradores-ti',
  templateUrl: './modal-colaboradores-ti.component.html',
  styleUrls: ['./modal-colaboradores-ti.component.scss']
})
export class ModalColaboradoresTiComponent {

  constructor(private dialogRef: MatDialogRef<ModalColaboradoresDpComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { colaboradorCompleto: ColaboradorCompleto }) {
  }



}
