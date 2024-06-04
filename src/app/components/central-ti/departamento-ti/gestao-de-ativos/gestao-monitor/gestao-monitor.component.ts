import { Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogExclusaoComputadoresTiComponent } from '../../../modais/modais-ti/dialog/dialog-exclusao-computadores-ti/dialog-exclusao-computadores-ti.component';
import { ModalVisualizarAtivosTiComponent } from '../../../modais/modais-ti/modal-visualizar-ativos-ti/modal-visualizar-ativos-ti.component';
import { ModalGestaoMonitoresComponent } from '../../../modais/modais-ti/gestao-de-ativos/modal-gestao-monitores/modal-gestao-monitores.component';
import { GestaoAtivos } from 'src/app/interface/gestaoAtivos';
import { GestaoAtivosService } from 'src/app/services/departamento-ti/gestao-ativos/gestao-ativos.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ModalEditarAtivosTiComponent } from '../../../modais/modais-ti/modal-editar-ativos-ti/modal-editar-ativos-ti.component';

@Component({
  selector: 'app-gestao-monitor',
  templateUrl: './gestao-monitor.component.html',
  styleUrls: ['./gestao-monitor.component.scss']
})
export class GestaoMonitorComponent {
  gestaoAtivos: GestaoAtivos[] = [];

  dataSource = new MatTableDataSource<GestaoAtivos>(this.gestaoAtivos);
  displayedColumns: string[] = ['nome', 'descricao', 'localizacao','status',  'tipo', 'acao'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  constructor(public dialog: MatDialog, private toastrService: NbToastrService,
    private router: Router, private gestaoAtivosService: GestaoAtivosService,

  ) {
    this.getAllColaboradores();
  }

  loading: boolean = true;
  getAllColaboradores() {
    const tipo = "Monitores"
    this.gestaoAtivosService.getAllAtivos(tipo).subscribe(
      (data: GestaoAtivos[] | null) => {
        try {
          if (data) {
            this.gestaoAtivos = data;
            this.dataSource.data = this.gestaoAtivos;
          } else {
            throw new Error('Array de ativos é nulo.');
          }
        } catch (error) {
          console.log('Erro ao filtrar ativos:', error);
          this.toastrService.danger('Erro ao filtrar ativos.', 'Erro');
        } finally {
          this.loading = false; // Finaliza o estado de carregamento após tentar obter e filtrar os dados
        }
      },
      (error) => {
        console.log('Erro ao obter ativos:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao obter ativos.', 'Erro');
        }
    }
    );
  }

  openComputadores(gestaoAtivos: GestaoAtivos) {
    const dialogRef = this.dialog.open(ModalVisualizarAtivosTiComponent, { data: { gestaoAtivos: gestaoAtivos } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.gestaoAtivos}`);
    });
  }

  openAdicionarAtivos() {
    this.dialog.open(ModalGestaoMonitoresComponent);
  }

  deleteRow(element: any) {
    // Para excluir uma linha, você precisa encontrar o índice do elemento na fonte de dados
    const index = this.dataSource.data.indexOf(element);
    if (index !== -1) {
      // Se o elemento existir, remova-o da fonte de dados
      this.dataSource.data.splice(index, 1);
      // Notifique a tabela sobre a mudança na fonte de dados
      this.dataSource._updateChangeSubscription();
    }
  }

  openConfirmacao() {
    this.dialog.open(DialogExclusaoComputadoresTiComponent);
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

            case 'status':
              return data.status.toLowerCase().includes(searchString);
              case 'localizacao':
                return data.localizacao.toLowerCase().includes(searchString);

          default:
            return false; // Retorna falso para evitar a filtragem se nenhum campo for selecionado
        }
      };
    } else {
      // Se nenhum filtro estiver selecionado, limpa o filtro
      this.dataSource.filter = '';
    }
  }
  editarAtivos(gestaoAtivos: GestaoAtivos) {
    const dialogRef = this.dialog.open(ModalEditarAtivosTiComponent, { data: { gestaoAtivos: gestaoAtivos } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.gestaoAtivos}`);
    });
  }

  deletar(gestaoAtivos: GestaoAtivos){
    this.gestaoAtivosService.deletarAtivos(gestaoAtivos.id).subscribe(
      response => {
      this.toastrService.success("Ativo deletado com sucesso!", "Sucesso");
      setTimeout(() => {
        location.reload(); // Recarrega a página após1 segundos
      }, 1000);
      },
      (error) => {
        console.log('Erro ao deletar ativos:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao deletar ativos.', 'Erro');
        }
    }
    )
  }

}