import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';

@Component({
  selector: 'app-modal-colaboradores-dp',
  templateUrl: './modal-colaboradores-dp.component.html',
  styleUrls: ['./modal-colaboradores-dp.component.scss']
})
export class ModalColaboradoresDpComponent {
  
  constructor(private dialogRef: MatDialogRef<ModalColaboradoresDpComponent>,
    private toastrService: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { colaboradorCompleto: ColaboradorCompleto }) {
      console.log(data)
  }



}
