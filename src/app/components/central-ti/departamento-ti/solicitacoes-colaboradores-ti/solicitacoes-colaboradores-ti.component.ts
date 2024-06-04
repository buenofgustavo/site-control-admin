import { Component } from '@angular/core';

import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogExclusaoChamadosTiComponent } from '../../modais/modais-ti/dialog/dialog-exclusao-chamados-ti/dialog-exclusao-chamados-ti.component';
import { MatSort } from '@angular/material/sort';
import { SolicitacaoAssociadaColaborador } from 'src/app/interface/solicitacaoAssociadaColaborador';
import { SolicitacaoAssociadaColaboradorService } from 'src/app/services/departamento-ti/solicitacaoAssociadaColaborador/solicitacao-associada-colaborador.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ModalVisualizarSolicitacoesComponent } from '../../modais/modais-ti/modal-visualizar-solicitacoes/modal-visualizar-solicitacoes.component';


@Component({
  selector: 'app-solicitacoes-colaboradores-ti',
  templateUrl: './solicitacoes-colaboradores-ti.component.html',
  styleUrls: ['./solicitacoes-colaboradores-ti.component.scss']
})
export class SolicitacoesColaboradoresTiComponent {

  concluido: boolean = false;
  
  solicitacaoAssociadaColaborador: SolicitacaoAssociadaColaborador[] = [];

  dataSource = new MatTableDataSource<SolicitacaoAssociadaColaborador>(this.solicitacaoAssociadaColaborador);
  displayedColumns: string[] = ['nome', 'tipo', 'status', 'usuario_solicitante', 'dataAbertura', 'acao'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private toastrService: NbToastrService,
    private router: Router, private solicitacaoAssociadaColaboradorService: SolicitacaoAssociadaColaboradorService,

  ) {
    this.getAllSolicitacoes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  
  selectedFilter: string | null = null;
  selectFilter(event: any) {
    this.selectedFilter = event.target.value;
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Verifica se há um filtro selecionado
    if (this.selectedFilter) {
      // Aplica o filtro no campo selecionado
      this.dataSource.filter = filterValue;
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const searchString = filter.toLowerCase();
        // Aplica o filtro no campo selecionado
        switch (this.selectedFilter) {
          case 'nome':
            return data.nome.toLowerCase().includes(searchString);
          case 'tipo':
            return data.tipo.toLowerCase().includes(searchString);
            case 'status':
              return data.status.toLowerCase().includes(searchString);
              case 'usuario_solicitante':
                return data.usuario_solicitante.toLowerCase().includes(searchString);

          default:
            return false; // Retorna falso para evitar a filtragem se nenhum campo for selecionado
        }
      };
    } else {
      // Se nenhum filtro estiver selecionado, limpa o filtro
      this.dataSource.filter = '';
    }
  }
  
  loading: boolean = true;
  getAllSolicitacoes() {
    if(!this.concluido){
    this.loading = true
    this.solicitacaoAssociadaColaboradorService.getAllSolicitacoes().subscribe(
      (data: SolicitacaoAssociadaColaborador[] | null) => {
        try {

          if (data) {
            this.solicitacaoAssociadaColaborador = data.filter( solicitacao => solicitacao.status === "Em aberto" || solicitacao.status === "Pendente"  );
            this.solicitacaoAssociadaColaborador.reverse();
            this.dataSource.data = this.solicitacaoAssociadaColaborador;
          } else {
            throw new Error('Array de solicitações é nulo.');
          }
        } catch (error) {
          console.log('Erro ao filtrar solicitações:', error);
          this.toastrService.danger('Erro ao filtrar solicitações.', 'Erro');
        } finally {
          this.loading = false; // Finaliza o estado de carregamento após tentar obter e filtrar os dados
        }
      },
      (error) => {
        console.log('Erro ao obter solicitações:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao obter solicitações.', 'Erro');
        }
        this.loading = false;
    }
    );
    }
    else{
      this.loading = true
      this.solicitacaoAssociadaColaboradorService.getAllSolicitacoes().subscribe(
        (data: SolicitacaoAssociadaColaborador[] | null) => {
          try {
  
            if (data) {
              this.solicitacaoAssociadaColaborador = data.filter( solicitacao => solicitacao.status === "Solucionado" || solicitacao.status === "Fechado"  );
              this.solicitacaoAssociadaColaborador.reverse();
              this.dataSource.data = this.solicitacaoAssociadaColaborador;
            } else {
              throw new Error('Array de solicitações é nulo.');
            }
          } catch (error) {
            console.log('Erro ao filtrar solicitações:', error);
            this.toastrService.danger('Erro ao filtrar solicitações.', 'Erro');
          } finally {
            this.loading = false; // Finaliza o estado de carregamento após tentar obter e filtrar os dados
          }
        },
        (error) => {
          console.log('Erro ao obter solicitações:', error);
          if (error.status === 403) {
            setTimeout(() => {
              location.reload(); // Recarrega a página após1 segundos
            }, 2000);
          } else {
            this.toastrService.danger('Erro ao obter solicitações.', 'Erro');
          }
          this.loading = false;
      }
      );
    }
  }
  


  openDialog(solicitacaoAssociadaColaborador: SolicitacaoAssociadaColaborador) {
    const dialogRef = this.dialog.open(ModalVisualizarSolicitacoesComponent, { data: { solicitacaoAssociadaColaborador: solicitacaoAssociadaColaborador } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.solicitacaoAssociadaColaborador}`);
    });
  }

  concluir(solicitacaoAssociadaColaborador: SolicitacaoAssociadaColaborador){
    const status = "Solucionado"
    
    this.solicitacaoAssociadaColaboradorService.modificarStatus(solicitacaoAssociadaColaborador.id, status).subscribe(
      response => {
        this.toastrService.success(`Status alterado com sucesso`, "Sucesso", { duration: 5000 });
        setTimeout(() => {
          location.reload(); // Recarrega a página após 1 segundos
        }, 500);
      },
      (error) => {
        console.log('Erro ao atualizar status:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao atualizar status.', 'Erro');
        }
        this.loading = false;
    }
    )
  }

  pendente(solicitacaoAssociadaColaborador: SolicitacaoAssociadaColaborador){
    const status = "Pendente"
    
    this.solicitacaoAssociadaColaboradorService.modificarStatus(solicitacaoAssociadaColaborador.id, status).subscribe(
      response => {
        this.toastrService.success(`Status alterado com sucesso`, "Sucesso", { duration: 5000 });
        setTimeout(() => {
          location.reload(); // Recarrega a página após 1 segundos
        }, 500);
      },
      (error) => {
        console.log('Erro ao atualizar status:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao atualizar status.', 'Erro');
        }
        this.loading = false;
      }
    
    )
  }

  fechado(solicitacaoAssociadaColaborador: SolicitacaoAssociadaColaborador){
    const status = "Fechado"
    
    this.solicitacaoAssociadaColaboradorService.modificarStatus(solicitacaoAssociadaColaborador.id, status).subscribe(
      response => {
        this.toastrService.success(`Status alterado com sucesso`, "Sucesso", { duration: 5000 });
        setTimeout(() => {
          location.reload(); // Recarrega a página após 1 segundos
        }, 500);
      },
      (error) => {
        console.log('Erro ao atualizar status:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao atualizar status.', 'Erro');
        }
        this.loading = false;
    }
    )
  }

  aberto(solicitacaoAssociadaColaborador: SolicitacaoAssociadaColaborador){
    const status = "Em aberto"
    
    this.solicitacaoAssociadaColaboradorService.modificarStatus(solicitacaoAssociadaColaborador.id, status).subscribe(
      response => {
        this.toastrService.success(`Status alterado com sucesso`, "Sucesso", { duration: 5000 });
        setTimeout(() => {
          location.reload(); // Recarrega a página após 1 segundos
        }, 500);
      },
      (error) => {
        console.log('Erro ao atualizar status:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao atualizar status.', 'Erro');
        }
        this.loading = false;
    }
    )
  }
  openConfirmacao() {
    this.dialog.open(DialogExclusaoChamadosTiComponent);
  }

}

