import { Component, ViewChild } from '@angular/core';
import { Computadores } from 'src/app/interface/computadores';
import { ModalComputadoresTiComponent } from '../../modais/modais-ti/modal-computadores-ti/modal-computadores-ti.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ComputadoresService } from 'src/app/services/departamento-ti/computadores/computadores.service';
import { NbToastrService } from '@nebular/theme';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';
import { ModalColaboradoresDpComponent } from '../../modais/modais-dp/modal-colaboradores-dp/modal-colaboradores-dp.component';
import { ColaboradoresService } from 'src/app/services/departamento-pessoal/colaboradores/colaboradores.service';
import { ModalColaboradoresTiComponent } from '../../modais/modais-ti/modal-colaboradores-ti/modal-colaboradores-ti.component';

@Component({
  selector: 'app-colaboradores-compras',
  templateUrl: './colaboradores-compras.component.html',
  styleUrls: ['./colaboradores-compras.component.scss']
})
export class ColaboradoresComprasComponent {

  colaboradorCompleto: ColaboradorCompleto[] = [];


  dataSource = new MatTableDataSource<ColaboradorCompleto>(this.colaboradorCompleto);
  displayedColumns: string[] = ['nome', 'numero', 'cpf', 'departamento', 'filial', 'computador', 'acao'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(public dialog: MatDialog, private toastrService: NbToastrService, private router: Router, private colaboradoresService: ColaboradoresService) {
    this.getAllColaboradores();
    console.log(this.colaboradorCompleto)
  }

  openDialog(colaboradorCompleto: ColaboradorCompleto) {
    const dialogRef = this.dialog.open(ModalColaboradoresTiComponent, { data: { colaboradorCompleto: colaboradorCompleto } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.colaboradorCompleto}`);
    });
  }

  loading: boolean = true;
  concluido: boolean = false;
  getAllColaboradores() {
    this.loading = true;
    this.colaboradoresService.getAllColaboradores().subscribe(
      (data: ColaboradorCompleto[] | null) => {
        try {
          if (data) {
            // Ordena os colaboradores pelo nome em ordem alfabética
            data.sort((a, b) => a.colaboradoresDTO.nome.localeCompare(b.colaboradoresDTO.nome));

            if (this.concluido === true) {
              // Filtra colaboradores com status false
              localStorage.setItem('concluido-colaboradores-compras', this.concluido.toString());

              this.colaboradorCompleto = data.filter(colaborador => colaborador.colaboradoresDTO.status === false);
            } else {
              localStorage.removeItem('concluido-colaboradores-compras');
              localStorage.removeItem('termo-colaboradores-compras');
              // Filtra colaboradores com status true
              this.colaboradorCompleto = data.filter(colaborador => colaborador.colaboradoresDTO.status === true);
            }

            this.dataSource.data = this.colaboradorCompleto;
          } else {
            throw new Error('Array de colaboradores é nulo.');
          }
        } catch (error) {
          console.log('Erro ao filtrar colaboradores:', error);
          this.toastrService.danger('Erro ao filtrar colaboradores.', 'Erro');
        } finally {
          this.loading = false; // Finaliza o estado de carregamento após tentar obter e filtrar os dados
        }
      },
      (error) => {
        console.log('Erro ao obter colaboradores:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao obter colaboradores.', 'Erro');
        }
        this.loading = false; // Finaliza o estado de carregamento em caso de erro
      }
    );
  }

  selectedFilter: string = '';
  filterValue: string = '';

  ngOnInit() {
    // Recupera os valores do filtro do localStorage
    const storedSelectedFilter = localStorage.getItem('selectedFilter-colaboradores-compras');
    const storedFilterValue = localStorage.getItem('filterValue-colaboradores-compras');
    const storedTermo = localStorage.getItem('termo-colaboradores-compras');
    const storedConcluido = localStorage.getItem('concluido-colaboradores-compras');

    if (storedSelectedFilter) {
      this.selectedFilter = storedSelectedFilter;
    }

    if (storedFilterValue) {
      this.filterValue = storedFilterValue;
      this.applyFilterWithValue(storedFilterValue);
    }

    if (storedConcluido !== null) {
      this.concluido = storedConcluido === 'true';
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilterWithValue(filterValue);

    // Salva os valores no localStorage
    localStorage.setItem('selectedFilter-colaboradores-compras', this.selectedFilter!);
    localStorage.setItem('filterValue-colaboradores-compras', filterValue);
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
      case 'nome':
        return this.normalizeString(data.colaboradoresDTO.nome.toLowerCase());
      case 'cpf':
        return this.normalizeString(data.colaboradoresDTO.cpf.toLowerCase());
      case 'departamento':
        return this.normalizeString(data.colaboradoresDTO.departamento.toLowerCase());
      case 'filial':
        return this.normalizeString(data.colaboradoresDTO.filial.toLowerCase());
      case 'computador':
        return this.normalizeString(data.computadoresDTO.nomeComputador.toLowerCase());
      default:
        return ''; // Retorna uma string vazia se nenhum campo for selecionado
    }
  }

  normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }


}

