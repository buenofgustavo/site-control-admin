import { Component, ViewChild } from '@angular/core';
import { Computadores } from 'src/app/interface/computadores';
import { ModalComputadoresTiComponent } from '../../modais/modais-ti/modal-computadores-ti/modal-computadores-ti.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { ComputadoresService } from 'src/app/services/departamento-ti/computadores/computadores.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ModalLogComputadoresComponent } from '../../modais/modais-ti/modal-log-computadores/modal-log-computadores.component';

@Component({
  selector: 'app-computadores-compras',
  templateUrl: './computadores-compras.component.html',
  styleUrls: ['./computadores-compras.component.scss']
})
export class ComputadoresComprasComponent {
  computadoresCompletos: Computadores[] = [];
  computadoresCompletosDTO: Computadores[] = [];
  dataSource = new MatTableDataSource<Computadores>(this.computadoresCompletos);
  displayedColumns: string[] = ['nomeComputador', 'userAtual', 'nomeUsuario', 'mac', 'makro', 'localizacao', 'serial', 'acao'];

  concluido: boolean = false;
  makro: boolean = false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public dialog: MatDialog, private toastrService: NbToastrService,
    private router: Router, private computadoresService: ComputadoresService,


  ) {
    this.getAllComputadores();

  }

  deletarComputador(computadores: Computadores) {
    this.computadoresService.deletarAtivos(computadores.enderecoMac).subscribe(
      response => {
        this.toastrService.success("Computador deletado com sucesso!", "Sucesso");
        setTimeout(() => {
          location.reload(); // Recarrega a página após1 segundos
        }, 1000);
      },
      (error) => {
        console.log('Erro ao deletar computador:', error);
        if (error.status === 403) {
          // setTimeout(() => {
          //   location.reload(); // Recarrega a página após1 segundos
          // }, 2000);
        } else {
          this.toastrService.danger('Erro ao deletar computador.', 'Erro');
        }
      }
    )
  }

  openComputadores(computadoresCompleto: Computadores) {
    const dialogRef = this.dialog.open(ModalComputadoresTiComponent, { data: { computadoresCompleto: computadoresCompleto } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.computadoresCompleto}`);
    });
  }

  loading: boolean = true;
  getAllComputadores() {
    this.computadoresService.getAllComputadores().subscribe(
      (data: Computadores[] | null) => {
        try {
          if (!data) {
            throw new Error('Array de computadores é nulo.');
          }

          data.sort((a, b) => a.nomeComputador.localeCompare(b.nomeComputador));

          this.computadoresCompletos = [];
          if (this.concluido) {
            localStorage.setItem('concluido-compras', this.concluido.toString());
            this.computadoresCompletos = data.filter(computador => !computador.userAtual);
          } else if (this.makro) {
            localStorage.setItem('makro-compras', this.makro.toString());
            this.computadoresCompletos = data.filter(computador => computador.makroInstalado == "NÃO INSTALADO");
          }
          else {
            localStorage.removeItem('concluido-compras');
            localStorage.removeItem('makro-compras');
            this.computadoresCompletos = data
          }

          this.dataSource.data = this.computadoresCompletos;
        } catch (error) {
          console.log('Erro ao filtrar computadores:', error);
          this.toastrService.danger('Erro ao filtrar computadores.', 'Erro');
        } finally {
          this.loading = false;
        }
      },
      (error) => {
        console.log('Erro ao obter computadores:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload();
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao obter computadores.', 'Erro');
        }
        this.loading = false;
      }
    );
  }

  selectedFilter: string = '';
  selectFilter(event: any) {
    this.selectedFilter = event.target.value;
  }

  filterValue: string = '';

  ngOnInit() {
    // Recupera os valores do filtro do localStorage
    const storedSelectedFilter = localStorage.getItem('selectedFilter-compras');
    const storedFilterValue = localStorage.getItem('filterValue-compras');
    const storedMakro = localStorage.getItem('makro-compras');
    const storedConcluido = localStorage.getItem('concluido-compras');

    if (storedSelectedFilter) {
      this.selectedFilter = storedSelectedFilter;
    }

    if (storedFilterValue) {
      this.filterValue = storedFilterValue;
      this.applyFilterWithValue(this.filterValue);
    }

    if (storedMakro !== null) {
      this.makro = storedMakro === 'true';
    }

    if (storedConcluido !== null) {
      this.concluido = storedConcluido === 'true';
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilterWithValue(filterValue);

    // Salva os valores no localStorage
    localStorage.setItem('selectedFilter-compras', this.selectedFilter);
    localStorage.setItem('filterValue-compras', filterValue);
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
    } else {
      // Se nenhum filtro estiver selecionado, limpa o filtro
      this.dataSource.filter = '';
    }
  }
  
  getNormalizedFieldValue(data: any): string {
    switch (this.selectedFilter) {
      case 'nomeUserAtual':
        return this.normalizeString(data.nomeUserAtual?.toLowerCase() ?? '');
      case 'nomeComputador':
        return this.normalizeString(data.nomeComputador.toLowerCase());
      case 'marca':
        return this.normalizeString(data.marca.toLowerCase());
      case 'enderecoMac':
        return this.normalizeString(data.enderecoMac.toLowerCase());
      case 'localizacao':
        return this.normalizeString(data.localizacao.toLowerCase());
      default:
        return ''; // Retorna uma string vazia se nenhum campo for selecionado
    }
  }

  normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  openLog(computadoresCompleto: Computadores) {
    const dialogRef = this.dialog.open(ModalLogComputadoresComponent, { data: { computadoresCompleto: computadoresCompleto } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.computadoresCompleto}`);
    });
  }

}

