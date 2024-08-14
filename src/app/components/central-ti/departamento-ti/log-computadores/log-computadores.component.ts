import { Component } from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComputadoresTiComponent } from '../../modais/modais-ti/modal-computadores-ti/modal-computadores-ti.component';
import { DialogExclusaoComputadoresTiComponent } from '../../modais/modais-ti/dialog/dialog-exclusao-computadores-ti/dialog-exclusao-computadores-ti.component';
import { ComputadoresService } from 'src/app/services/departamento-ti/computadores/computadores.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Computadores } from 'src/app/interface/computadores';
import { MatSort } from '@angular/material/sort';
import { ModalLogComputadoresComponent } from '../../modais/modais-ti/modal-log-computadores/modal-log-computadores.component';
import { LogComputadores } from 'src/app/interface/logComputadores';


@Component({
  selector: 'app-log-computadores',
  templateUrl: './log-computadores.component.html',
  styleUrls: ['./log-computadores.component.scss']
})
export class LogComputadoresComponent {
  logComputadores: LogComputadores[] = [];
  dataSource = new MatTableDataSource<LogComputadores>(this.logComputadores);
  displayedColumns: string[] = ['computadorVinculado', 'message', 'nomeUser', 'datahora'];

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
    this.getLog();
  }

  loading: boolean = true;
  getLog() {
    this.computadoresService.getLog().subscribe(
      (data: LogComputadores[] | null) => {
          try {
            if (data) {
              this.logComputadores = data.filter(item => 
                item.nomeUser !== "log@salvarserial" && item.nomeUser !== "Log@ControlAdmin"
                && item.message != "filial" && item.message != "sucata" && item.message != "matriz"
                && item.message != "erro" && item.message != 'conserto' && item.message != 'pronto'
                && item.nomeUser != 'log@status'
              );              
              this.logComputadores.reverse();
              this.dataSource.data = this.logComputadores;
            } else {
              throw new Error('Array de logs é nulo.');
            }
          } catch (error) {
            console.log('Erro ao filtrar logs:', error);
            this.toastrService.danger('Erro ao filtrar logs.', 'Erro');
          } finally {
            this.loading = false; // Finaliza o estado de carregamento após tentar obter e filtrar os dados
          }
      },
      (error) => {
        console.log('Erro ao obter logs:', error);
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

}
