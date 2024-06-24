import { Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogExclusaoComputadoresTiComponent } from '../../../modais/modais-ti/dialog/dialog-exclusao-computadores-ti/dialog-exclusao-computadores-ti.component';
import { ModalVisualizarAtivosTiComponent } from '../../../modais/modais-ti/modal-visualizar-ativos-ti/modal-visualizar-ativos-ti.component';
import { ModalGestaoOutrosComponent } from '../../../modais/modais-ti/gestao-de-ativos/modal-gestao-outros/modal-gestao-outros.component';
import { GestaoAtivos } from 'src/app/interface/gestaoAtivos';
import { NbToastrService } from '@nebular/theme';
import { GestaoAtivosService } from 'src/app/services/departamento-ti/gestao-ativos/gestao-ativos.service';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ModalEditarAtivosTiComponent } from '../../../modais/modais-ti/modal-editar-ativos-ti/modal-editar-ativos-ti.component';



interface TableColoboradores {
  nome: string;
  tipo: number;
  descricao: string;
  localizacao: string;
  modelo: string;
  status: string;
}

const ELEMENT_DATA: TableColoboradores[] = [
  {tipo: 1, nome: 'Hydrogen', descricao: "1.0079", localizacao: 'H', modelo: '', status:'ativo'},
  {tipo: 2, nome: 'Helium', descricao: "4.0026", localizacao: 'He', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
  {tipo: 3, nome: 'Lithium', descricao: "6.941", localizacao: 'Li', modelo: '', status:'ativo'},
];
@Component({
  selector: 'app-gestao-outros',
  templateUrl: './gestao-outros.component.html',
  styleUrls: ['./gestao-outros.component.scss']
})
export class GestaoOutrosComponent {
  gestaoAtivos: GestaoAtivos[] = [];

  dataSource = new MatTableDataSource<GestaoAtivos>(this.gestaoAtivos);
  displayedColumns: string[] = ['nome', 'descricao', 'localizacao','status',  'tipo', 'serial', 'acao'];

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
    const tipo = "Outros"
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
    this.dialog.open(ModalGestaoOutrosComponent);
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

  selectedFilter: string = '';
  filterValue: string = '';

  selectFilter(event: any) {
    this.selectedFilter = event.target.value;
  }

  ngOnInit() {
    // Recupera os valores do filtro do localStorage
    const storedSelectedFilter = localStorage.getItem('selectedFilter-computador-compras');
    const storedFilterValue = localStorage.getItem('filterValue-computador-compras');

    if (storedSelectedFilter) {
      this.selectedFilter = storedSelectedFilter;
    }

    if (storedFilterValue) {
      this.filterValue = storedFilterValue
      this.applyFilterWithValue(storedFilterValue);
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilterWithValue(filterValue);

    // Salva os valores no localStorage
    localStorage.setItem('selectedFilter-computador-compras', this.selectedFilter);
    localStorage.setItem('filterValue-computador-compras', filterValue);
  }

  applyFilterWithValue(filterValue: string) {
    const normalizedFilterValue = this.normalizeString(filterValue.toLowerCase());
  
    // Verifica se há um filtro selecionado
    if (this.selectedFilter) {
      // Aplica o filtro no campo selecionado
      this.dataSource.filter = normalizedFilterValue;
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const normalizedDataValue = this.getNormalizedFieldValue(data);
        return normalizedDataValue.includes(filter);
      };
      // Atualiza o filtro no DataSource
      this.dataSource.filter = normalizedFilterValue;
    } else {
      // Se nenhum filtro estiver selecionado, limpa o filtro
      this.dataSource.filter = '';
    }
  }
  
  getNormalizedFieldValue(data: any): string {
    switch (this.selectedFilter) {
      case 'nome':
        return this.normalizeString(data.nome.toLowerCase());
      case 'status':
        return this.normalizeString(data.status.toLowerCase());
      case 'localizacao':
        return this.normalizeString(data.localizacao.toLowerCase());
      case 'serial':
        return this.normalizeString(data.serial.toLowerCase());
      default:
        return ''; // Retorna uma string vazia se nenhum campo for selecionado
    }
  }

  normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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