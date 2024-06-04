import { Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ModalColaboradoresDpComponent } from '../../modais/modais-dp/modal-colaboradores-dp/modal-colaboradores-dp.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalColaboradoresTiComponent } from '../../modais/modais-ti/modal-colaboradores-ti/modal-colaboradores-ti.component';
import { ModalEditarColaboradoresTiComponent } from '../../modais/modais-ti/modal-editar-colaboradores-ti/modal-editar-colaboradores-ti.component';
import { DialogExclusaoColaboradoresTiComponent } from '../../modais/modais-ti/dialog/dialog-exclusao-colaboradores-ti/dialog-exclusao-colaboradores-ti.component';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';
import { MatSort } from '@angular/material/sort';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ColaboradoresService } from 'src/app/services/departamento-pessoal/colaboradores/colaboradores.service';
import { VincularComputadorService } from 'src/app/services/departamento-ti/vincular-computadores/vincular-computador.service';

@Component({
  selector: 'app-colaboradores-ti',
  templateUrl: './colaboradores-ti.component.html',
  styleUrls: ['./colaboradores-ti.component.scss']
})
export class ColaboradoresTiComponent {

  concluido: boolean = false;
  termo: boolean = false;

  colaboradorCompleto: ColaboradorCompleto[] = [];

  dataSource = new MatTableDataSource<ColaboradorCompleto>(this.colaboradorCompleto);
  displayedColumns: string[] = ['nome', 'numero', 'cpf', 'departamento', 'filial', 'computador', 'acao'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  constructor(public dialog: MatDialog, private toastrService: NbToastrService,
    private router: Router, private colaboradoresService: ColaboradoresService,

  ) {
    this.getAllColaboradores();
  }

  openColaboradores(colaboradorCompleto: ColaboradorCompleto) {
    const dialogRef = this.dialog.open(ModalColaboradoresTiComponent, { data: { colaboradorCompleto: colaboradorCompleto } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.colaboradorCompleto}`);
    });
  }

  openEditarColaboradores(colaboradorCompleto: ColaboradorCompleto) {
    const dialogRef = this.dialog.open(ModalEditarColaboradoresTiComponent, { data: { colaboradorCompleto: colaboradorCompleto } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.colaboradorCompleto}`);
    });
  }

  loading: boolean = true;
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
            } 
            else if(this.termo === true) {
              this.colaboradorCompleto = data.filter(colaborador => colaborador.colaboradoresDTO.termo === false);
            } 
            else {
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

  assinarTermo(colaborador: ColaboradorCompleto) {
    this.colaboradoresService.assinarTermo(colaborador.colaboradoresDTO.cpf).subscribe(
      response => {
        this.toastrService.success(`Termo atualizado com sucesso!`, "Sucesso", { duration: 5000 });
        setTimeout(() => {
          location.reload(); // Recarrega a página após 1 segundo
        }, 1000);
      },
      error => {
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após 1 segundo
          }, 1000);
        } else {
          if (error.error && error.error.message) {
            this.toastrService.warning(error.error.message, "Erro");
          } else {
            this.toastrService.warning('Erro ao atualizar o termo!', "Erro");
          }
        }
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
