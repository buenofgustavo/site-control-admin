import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { GestaoAtivos } from 'src/app/interface/gestaoAtivos';
import { MatSort } from '@angular/material/sort';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { GestaoAtivosService } from 'src/app/services/departamento-ti/gestao-ativos/gestao-ativos.service';
import { ModalVisualizarAtivosTiComponent } from '../../modais/modais-ti/modal-visualizar-ativos-ti/modal-visualizar-ativos-ti.component';
import { ModalGestaoArmariosComponent } from '../../modais/modais-ti/gestao-de-ativos/modal-gestao-armarios/modal-gestao-armarios.component';
import { ModalEditarAtivosTiComponent } from '../../modais/modais-ti/modal-editar-ativos-ti/modal-editar-ativos-ti.component';
import { RegistroDiarioService } from 'src/app/services/departamento-ti/registro-diario/registro-diario.service';
import { RegistroDiario } from 'src/app/interface/registroDiario';
import { ModalRegistroDiarioComponent } from './modais/modal-registro-diario/modal-registro-diario.component';

@Component({
  selector: 'app-registro-diario',
  templateUrl: './registro-diario.component.html',
  styleUrls: ['./registro-diario.component.scss']
})
export class RegistroDiarioComponent {
  registroDiario: RegistroDiario[] = [];

  dataSource = new MatTableDataSource<RegistroDiario>(this.registroDiario);
  displayedColumns: string[] = ['titulo', 'message', 'incluido', 'datahora', 'acao'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public dialog: MatDialog, private toastrService: NbToastrService,
    private router: Router, private registroDiarioService: RegistroDiarioService,

  ) {
    this.getAllColaboradores();
  }

  loading: boolean = true;
  getAllColaboradores() {
    this.registroDiarioService.getAllRegistros().subscribe(
      (data: RegistroDiario[] | null) => {
        try {
          if (data) {
            this.registroDiario = data;
            this.registroDiario.reverse();
            this.dataSource.data = this.registroDiario;
          } else {
            throw new Error('Array de registros é nulo.');
          }
        } catch (error) {
          console.log('Erro ao filtrar registros:', error);
          this.toastrService.danger('Erro ao filtrar registros.', 'Erro');
        } finally {
          this.loading = false; // Finaliza o estado de carregamento após tentar obter e filtrar os dados
        }
      },
      (error) => {
        console.log('Erro ao obter registros:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao obter registros.', 'Erro');
        }
      }
    );
  }

  openComputadores(registro: RegistroDiario) {
    const dialogRef = this.dialog.open(ModalRegistroDiarioComponent, { data: { registroDiario: registro } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.registro}`);
    });
  }

  openAdicionarAtivos() {
    this.dialog.open(ModalRegistroDiarioComponent);
  }

  selectedFilter: string = '';
  filterValue: string = '';

  selectFilter(event: any) {
    this.selectedFilter = event.target.value;
  }

  ngOnInit() {
    // Recupera os valores do filtro do localStorage
    const storedSelectedFilter = localStorage.getItem('selectedFilter-registro-diario-ti');
    const storedFilterValue = localStorage.getItem('filterValue-registro-diario-ti');

    if (storedSelectedFilter) {
      this.selectedFilter = storedSelectedFilter;
    }

    if (storedFilterValue) {
      this.filterValue = storedFilterValue
      this.applyFilterWithValue(storedFilterValue);
    }

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      if (this.selectedFilter === 'data' && this.selectedDate) {
        const formattedDataDate = this.formatDate(new Date(data.datahora));
        return formattedDataDate === filter;
      } else {
        const normalizedDataValue = this.getNormalizedFieldValue(data);
        return normalizedDataValue.includes(filter);
      }
    };

  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilterWithValue(filterValue);

    // Salva os valores no localStorage
    localStorage.setItem('selectedFilter-registro-diario-ti', this.selectedFilter);
    localStorage.setItem('filterValue-registro-diario-ti', filterValue);
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
      case 'titulo':
        return this.normalizeString(data.titulo.toLowerCase());
      case 'mensagem':
        return this.normalizeString(data.message.toLowerCase());
      case 'incluido':
        return this.normalizeString(data.incluido.toLowerCase());
      case 'data':
        return this.normalizeString(data.datahora.toLowerCase());
      default:
        return ''; // Retorna uma string vazia se nenhum campo for selecionado
    }
  }

  normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  selectedDate: Date | null = null;

  applyDateFilter() {
    if (this.selectedDate) {
      const formattedDate = this.formatDate(this.selectedDate);
      this.dataSource.filter = formattedDate;
    } else {
      this.dataSource.filter = ''; // Limpa o filtro quando a data não estiver selecionada
    }
  }
  
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  clearDate() {
    this.selectedDate = null; // Limpa a data selecionada
    this.applyDateFilter(); // Reaplica o filtro, se necessário
  }

}