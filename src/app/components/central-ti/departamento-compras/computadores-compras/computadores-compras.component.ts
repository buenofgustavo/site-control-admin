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

@Component({
  selector: 'app-computadores-compras',
  templateUrl: './computadores-compras.component.html',
  styleUrls: ['./computadores-compras.component.scss']
})
export class ComputadoresComprasComponent {
  computadoresCompletos: Computadores[] = [];
  computadoresCompletosDTO: Computadores[] = [];
  dataSource = new MatTableDataSource<Computadores>(this.computadoresCompletos);
  displayedColumns: string[] = ['nomeComputador', 'userAtual', 'nomeUsuario', 'mac', 'makro','localizacao', 'acao'];

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

  deletarComputador(computadores: Computadores){
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
            this.computadoresCompletos = data.filter(computador => !computador.userAtual);
          } else if (this.makro) {
            this.computadoresCompletos = data.filter(computador => computador.makroInstalado == "NÃO INSTALADO");
          } 
          else {
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
          case 'nomeUserAtual':
            if (data.nomeUserAtual && typeof data.nomeUserAtual === 'string') {
                return data.nomeUserAtual.toLowerCase().includes(searchString);
            } else {
                return false; // ou outro valor que você preferir quando data.nomeUserAtual for nulo
            }
          case 'nomeComputador':
            return data.nomeComputador.toLowerCase().includes(searchString);
            case 'marca':
              return data.marca.toLowerCase().includes(searchString);
              case 'enderecoMac':
                return data.enderecoMac.toLowerCase().includes(searchString);
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

}