import { Component, OnInit } from '@angular/core';

import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { ModalCadastroUsuarioDpComponent } from '../../modais/modais-dp/modal-cadastro-usuario-dp/modal-cadastro-usuario-dp.component';
import { ModalFeriasDpComponent } from '../../modais/modais-dp/modal-ferias-dp/modal-ferias-dp.component';
import { ModalDesligamentoDpComponent } from '../../modais/modais-dp/modal-desligamento-dp/modal-desligamento-dp.component';
import { ModalMudancaDeCargoDpComponent } from '../../modais/modais-dp/modal-mudanca-de-cargo-dp/modal-mudanca-de-cargo-dp.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalVisualizarChamadosGeralComponent } from '../../modais/modais-chamados/modal-visualizar-chamados-geral/modal-visualizar-chamados-geral.component';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ColaboradoresService } from 'src/app/services/departamento-pessoal/colaboradores/colaboradores.service';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';
import { Chamados } from 'src/app/interface/chamados';
import { ChamadosService } from 'src/app/services/chamados/chamados.service';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/interface/usuario-interface';

@Component({
  selector: 'app-visualizar-chamados-geral',
  templateUrl: './visualizar-chamados-geral.component.html',
  styleUrls: ['./visualizar-chamados-geral.component.scss']
})
export class VisualizarChamadosGeralComponent{

  chamados: Chamados[] = []

  displayedColumns: string[] = ['titulo', 'usuario_vinculado', 'prioridade', 'status', 'acao'];
  dataSource = new MatTableDataSource<Chamados>(this.chamados);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private toastrService: NbToastrService,
    private router: Router, private chamadosService: ChamadosService,
    private usuarioService: UsuarioService,
    ) {
  }


  usuario: Usuario = {
    name: '',
    login: '',
    password: '',
    role: '',
  }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.usuarioService.getUserByEmail().subscribe(
      (user: Usuario) => {
        this.usuario =  user; // Armazene os dados do Pessoa na variável local
        console.log(this.usuario)
        this.getAllChamados();
      },
      (error) => {
        console.error('Erro ao carregar dados do Pessoa:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectedFilter: string | null = null;
  selectFilter(event: any) {
    this.selectedFilter = event.target.value;
  }

  openDialog(chamado: Chamados) {
    const dialogRef = this.dialog.open(ModalVisualizarChamadosGeralComponent, { data: { chamados: chamado } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.chamado}`);
    });
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
          case 'titulo':
            return data.titulo.toLowerCase().includes(searchString);
          case 'status':
            return data.status.toLowerCase().includes(searchString);
            case 'usuario_vinculado':
              return data.usuario_vinculado.toLowerCase().includes(searchString);
              case 'prioridade':
                return data.prioriadade.toLowerCase().includes(searchString);

          default:
            return false; // Retorna falso para evitar a filtragem se nenhum campo for selecionado
        }
      };
    } else {
      // Se nenhum filtro estiver selecionado, limpa o filtro
      this.dataSource.filter = '';
    }
  }


  loading: boolean = false;
  concluido: boolean = false;



  getAllChamados() {
    if(!this.concluido){
    this.loading = true
    console.log("getAllChamados")
    console.log(this.usuario)
    this.chamadosService.getAllChamadosPorUsuario(this.usuario.login).subscribe(
      (data: Chamados[] | null) => {
        try {
          if (data) {
            console.log(data)
            this.chamados = data.filter( chamado => chamado.status === "Em aberto" || chamado.status === "Pendente" || chamado.status === "Atribuido" );
            this.chamados.reverse();
            this.dataSource.data = this.chamados;
          } else {
            throw new Error('Array de chamados é nulo.');
          }
        } catch (error) {
          console.log('Erro ao filtrar chamados:', error);
          this.toastrService.danger('Erro ao filtrar chamados.', 'Erro');
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
      this.chamadosService.getAllChamadosPorUsuario(this.usuario.login).subscribe(
        (data: Chamados[] | null) => {
          try {
  
            if (data) {
              this.chamados = data.filter( chamado => chamado.status === "Cancelado" || chamado.status === "Fechado" ||  chamado.status === "Concluido"  );
              this.chamados.reverse();
              this.dataSource.data = this.chamados;
            } else {
              throw new Error('Array de chamados é nulo.');
            }
          } catch (error) {
            console.log('Erro ao filtrar chamados:', error);
            this.toastrService.danger('Erro ao filtrar chamados.', 'Erro');
          } finally {
            this.loading = false; // Finaliza o estado de carregamento após tentar obter e filtrar os dados
          }
        },
        (error) => {
          console.log('Erro ao obter chamados:', error);
          if (error.status === 403) {
            setTimeout(() => {
              location.reload(); // Recarrega a página após1 segundos
            }, 2000);
          } else {
            this.toastrService.danger('Erro ao obter chamados.', 'Erro');
          }
          this.loading = false;
      }
      );
    }
  }

  cancelado(chamados: Chamados){
    const status = "Cancelado"
    
    this.chamadosService.modificarStatus(chamados.id, status).subscribe(
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

}