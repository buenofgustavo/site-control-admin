import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Chamados } from 'src/app/interface/chamados';
import { ChamadosService } from 'src/app/services/chamados/chamados.service';

@Component({
  selector: 'app-criar-chamados-geral',
  templateUrl: './criar-chamados-geral.component.html',
  styleUrls: ['./criar-chamados-geral.component.scss']
})
export class CriarChamadosGeralComponent {

  constructor(private chamadosService: ChamadosService,
    private toastrService: NbToastrService, private router:Router){

  }

   chamados: Chamados = {
    id: '',
    usuarioVinculado: "",
    titulo: "",
    descri: "",
    status: "",
    prioridade: "",
    categoria: "",
    excluido: false,
    atualizado_por: ""
    }

  selectedItemPrioridade = '0';
  selectedItemCategoria = '0';
  onFileChange(event: any) {
    this.filesToUpload = event.target.files;
  }

  filesToUpload: FileList | null = null;
  create(){      
 
      this.chamadosService.cadastrarChamados(this.chamados).subscribe(
        response =>{
          const novoChamadoId = response.id;
          console.log(novoChamadoId)
          console.log(this.filesToUpload === null)
          if(this.filesToUpload === null){
            this.toastrService.success("Chamado sem arquivo cadastrado com sucesso !", "Sucesso");
            return;
          }
          else {
            this.chamadosService.cadastrarArquivosChamados(this.filesToUpload, novoChamadoId).subscribe(
              response =>{
                this.toastrService.success("Chamado com arquivo cadastrado com sucesso!", "Sucesso");
              }
            )
          }
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/visualizar-chamados-geral']); // Navega para a rota de cadastro de armazém
            });
          }, 1000); 
          
        },
        (error) => {
          console.log('Erro ao cadastrar chamado:', error);
          if (error.status === 403) {
            setTimeout(() => {
              // location.reload(); // Recarrega a página após1 segundos
            }, 2000);
          } else {
            this.toastrService.danger('Erro ao cadastrar chamado.', 'Erro');
          }
          
        }
      ) 
      
    
  }

}
