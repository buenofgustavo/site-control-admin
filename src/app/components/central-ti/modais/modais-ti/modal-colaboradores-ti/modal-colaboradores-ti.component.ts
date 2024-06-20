import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalColaboradoresDpComponent } from '../../modais-dp/modal-colaboradores-dp/modal-colaboradores-dp.component';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';
import { NbToastrService } from '@nebular/theme';
import { VincularComputadorService } from 'src/app/services/departamento-ti/vincular-computadores/vincular-computador.service';
import { CadastroColaboradorService } from 'src/app/services/departamento-pessoal/cadastro-colaborador/cadastro-colaborador.service';
import { DocumentosColaboradores } from 'src/app/interface/documentosColaboradores';

@Component({
  selector: 'app-modal-colaboradores-ti',
  templateUrl: './modal-colaboradores-ti.component.html',
  styleUrls: ['./modal-colaboradores-ti.component.scss']
})
export class ModalColaboradoresTiComponent {

  constructor(private dialogRef: MatDialogRef<ModalColaboradoresDpComponent>,
    private toastrService: NbToastrService,
    private cadastroColaboradorService: CadastroColaboradorService,
    @Inject(MAT_DIALOG_DATA) public data: { colaboradorCompleto: ColaboradorCompleto }) {
  }

  hasDocument: boolean = false;


  arquivos: DocumentosColaboradores = {
    id: null,
    nomeArquivo: '',
    cpf: ''
  }

  openImage(): void {   
    this.cadastroColaboradorService.getDocumentos(this.data.colaboradorCompleto.colaboradoresDTO.cpf).subscribe(
      (data2: DocumentosColaboradores | null) => {
        try {
          if (data2) {
            this.arquivos = data2;
            if (this.arquivos) {
              const imageUrl = `../../../../assets/img-uploads/files-documentos/${this.arquivos.cpf}_${this.arquivos.nomeArquivo}`;
              console.log(imageUrl)
              window.open(imageUrl, '_blank');
          } 

          } else {
            this.toastrService.danger('Não possui arquivo.', 'Erro');
            throw new Error('Erro ao abrir arquivo.');
          }
        } catch (error) {
          console.log('Erro ao abrir arquivo.', error);
          this.toastrService.danger('Erro ao abrir arquivo.', 'Erro');
        } 
      },
      error =>{
        if(error.error && error.error.message){
          this.toastrService.warning(error.error.message, "Erro");
  
        }
        else{
          this.toastrService.warning('Erro ao buscar arquivos!', "Erro");
        }
      }
    )
  }

  checkDocumentAvailability(): void {
    this.cadastroColaboradorService.getDocumentos(this.data.colaboradorCompleto.colaboradoresDTO.cpf).subscribe(
      (data2: DocumentosColaboradores | null) => {
        this.hasDocument = !!data2;
      },
      error => {
        this.hasDocument = false;
      }
    );
  }

  ngOnInit(): void {
    this.checkDocumentAvailability(); // Verifica a disponibilidade do documento ao iniciar o componente
  }

}
