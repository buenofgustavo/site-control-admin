import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { Computadores } from 'src/app/interface/computadores';

@Component({
  selector: 'app-modal-computadores-ti',
  templateUrl: './modal-computadores-ti.component.html',
  styleUrls: ['./modal-computadores-ti.component.scss']
})
export class ModalComputadoresTiComponent {

  constructor(private dialogRef: MatDialogRef<ModalComputadoresTiComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { computadoresCompleto: Computadores }) {
      console.log(data)
  }

}
