import { Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ModalColaboradoresDpComponent } from '../../modais/modais-dp/modal-colaboradores-dp/modal-colaboradores-dp.component';
import { MatDialog } from '@angular/material/dialog';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';
import { MatSort } from '@angular/material/sort';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ColaboradoresService } from 'src/app/services/departamento-pessoal/colaboradores/colaboradores.service';




@Component({
  selector: 'app-colaboradores-dp',
  templateUrl: './colaboradores-dp.component.html',
  styleUrls: ['./colaboradores-dp.component.scss']
})
export class ColaboradoresDpComponent {

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
    const dialogRef = this.dialog.open(ModalColaboradoresDpComponent, { data: { colaboradorCompleto: colaboradorCompleto } });
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
              this.colaboradorCompleto = data.filter(colaborador => colaborador.colaboradoresDTO.status === false);
            } else {
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
            return data.colaboradoresDTO.nome.toLowerCase().includes(searchString);
          case 'cpf':
            return data.colaboradoresDTO.cpf.toLowerCase().includes(searchString);
            case 'departamento':
              return data.colaboradoresDTO.departamento.toLowerCase().includes(searchString);
              case 'filial':
                return data.colaboradoresDTO.filial.toLowerCase().includes(searchString);
            case 'computador':
              return data.computadoresDTO.nomeComputador.toLowerCase().includes(searchString);
          default:
            return false; // Retorna falso para evitar a filtragem se nenhum campo for selecionado
        }
      };
    } else {
      // Se nenhum filtro estiver selecionado, limpa o filtro
      this.dataSource.filter = '';
    }
  }

}
