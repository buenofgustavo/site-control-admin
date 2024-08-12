import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Filiais } from 'src/app/interface/filiais';
import { GestaoAtivos } from 'src/app/interface/gestaoAtivos';
import { RegistroDiario } from 'src/app/interface/registroDiario';
import { GestaoAtivosService } from 'src/app/services/departamento-ti/gestao-ativos/gestao-ativos.service';
import { RegistroDiarioService } from 'src/app/services/departamento-ti/registro-diario/registro-diario.service';
import { DepartamentoFiliaisService } from 'src/app/services/select-departamentos-filiais/departamento-filiais.service';

@Component({
  selector: 'app-modal-registro-diario',
  templateUrl: './modal-registro-diario.component.html',
  styleUrls: ['./modal-registro-diario.component.scss']
})
export class ModalRegistroDiarioComponent {

  registroDiario: RegistroDiario = {
    id: '',
    titulo: '',
    message: '',
    incluido: '',
    datahora: new Date()
  }


  constructor(private dialogRef: MatDialogRef<ModalRegistroDiarioComponent>,
    private toastrService: NbToastrService, private router: Router,
    private registroDiarioService: RegistroDiarioService,
  ) {
  }

  incluirRegistro() {
    console.log(this.registroDiario)
    this.registroDiarioService.cadastrarRegistro(this.registroDiario).subscribe(
      response => {
        this.toastrService.success("Registro incluido com sucesso!", "Sucesso");
        setTimeout(() => {
          location.reload(); // Recarrega a página após1 segundos
        }, 1000);
      },
      error => {
        if (error.error && error.error.message) {
          this.toastrService.warning(error.error.message, "Erro");

        }
        else {
          this.toastrService.warning('Erro ao registro ativo!', "Erro");
        }
      }
    )
  }

  isFormValid(): boolean {
    return this.registroDiario.titulo.trim() !== '' && this.registroDiario.message.trim() !== '';
  }

}

