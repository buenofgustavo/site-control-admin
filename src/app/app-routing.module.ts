import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SolicitarCadastroComponent } from './components/central-ti/departamento-pessoal/gestao-pessoal/tipos-de-solicitacao/solicitar-cadastro/solicitar-cadastro.component';
import { SolicitarDesligamentoComponent } from './components/central-ti/departamento-pessoal/gestao-pessoal/tipos-de-solicitacao/solicitar-desligamento/solicitar-desligamento.component';
import { ColaboradoresDpComponent } from './components/central-ti/departamento-pessoal/colaboradores-dp/colaboradores-dp.component';
import { ColaboradoresTiComponent } from './components/central-ti/departamento-ti/colaboradores-ti/colaboradores-ti.component';
import { GestaoPessoalComponent } from './components/central-ti/departamento-pessoal/gestao-pessoal/gestao-pessoal.component';
import { CadastrarFeriasComponent } from './components/central-ti/departamento-pessoal/gestao-pessoal/tipos-de-solicitacao/cadastrar-ferias/cadastrar-ferias.component';
import { MudancaDeCargoComponent } from './components/central-ti/departamento-pessoal/gestao-pessoal/tipos-de-solicitacao/mudanca-de-cargo/mudanca-de-cargo.component';
import { ModalColaboradoresDpComponent } from './components/central-ti/modais/modais-dp/modal-colaboradores-dp/modal-colaboradores-dp.component';
import { ModalCadastroUsuarioDpComponent } from './components/central-ti/modais/modais-dp/modal-cadastro-usuario-dp/modal-cadastro-usuario-dp.component';
import { ModalFeriasDpComponent } from './components/central-ti/modais/modais-dp/modal-ferias-dp/modal-ferias-dp.component';
import { ModalMudancaDeCargoDpComponent } from './components/central-ti/modais/modais-dp/modal-mudanca-de-cargo-dp/modal-mudanca-de-cargo-dp.component';
import { ModalDesligamentoDpComponent } from './components/central-ti/modais/modais-dp/modal-desligamento-dp/modal-desligamento-dp.component';
import { UserInfoComponent } from './components/central-ti/departamento-pessoal/templates/user-info/user-info.component';
import { GestaoPessoalTiComponent } from './components/central-ti/departamento-ti/gestao-pessoal-ti/gestao-pessoal-ti.component';
import { CadastroColaboradorTiComponent } from './components/central-ti/departamento-ti/gestao-pessoal-ti/tipos-de-cadastros-ti/cadastro-colaborador-ti/cadastro-colaborador-ti.component';
import { ChamadosTiComponent } from './components/central-ti/departamento-ti/chamados-ti/chamados-ti.component';
import { ModalColaboradoresTiComponent } from './components/central-ti/modais/modais-ti/modal-colaboradores-ti/modal-colaboradores-ti.component';
import { ModalEditarColaboradoresTiComponent } from './components/central-ti/modais/modais-ti/modal-editar-colaboradores-ti/modal-editar-colaboradores-ti.component';
import { VisualizarChamadosGeralComponent } from './components/central-ti/chamados/visualizar-chamados-geral/visualizar-chamados-geral.component';
import { CriarChamadosGeralComponent } from './components/central-ti/chamados/criar-chamados-geral/criar-chamados-geral.component';
import { ModalVisualizarChamadosGeralComponent } from './components/central-ti/modais/modais-chamados/modal-visualizar-chamados-geral/modal-visualizar-chamados-geral.component';
import { ComputadoresTiComponent } from './components/central-ti/departamento-ti/computadores-ti/computadores-ti.component';
import { ModalComputadoresTiComponent } from './components/central-ti/modais/modais-ti/modal-computadores-ti/modal-computadores-ti.component';
import { DesvincularComputadoresComponent } from './components/central-ti/departamento-ti/gestao-pessoal-ti/tipos-de-cadastros-ti/desvincular-computadores/desvincular-computadores.component';
import { DialogConfirmacaoCadastroComponent } from './components/central-ti/modais/modais-dp/dialog/dialog-confirmacao-cadastro/dialog-confirmacao-cadastro.component';
import { CadastrarUsuarioComponent } from './components/central-ti/cadastrar-usuario/cadastrar-usuario.component';
import { SolicitacoesColaboradoresTiComponent } from './components/central-ti/departamento-ti/solicitacoes-colaboradores-ti/solicitacoes-colaboradores-ti.component';
import { ModalVisualizarAtivosTiComponent } from './components/central-ti/modais/modais-ti/modal-visualizar-ativos-ti/modal-visualizar-ativos-ti.component';
import { GestaoImpressorasComponent } from './components/central-ti/departamento-ti/gestao-de-ativos/gestao-impressoras/gestao-impressoras.component';
import { GestaoCpdComponent } from './components/central-ti/departamento-ti/gestao-de-ativos/gestao-cpd/gestao-cpd.component';
import { GestaoComputadorComponent } from './components/central-ti/departamento-ti/gestao-de-ativos/gestao-computador/gestao-computador.component';
import { GestaoMonitorComponent } from './components/central-ti/departamento-ti/gestao-de-ativos/gestao-monitor/gestao-monitor.component';
import { GestaoOutrosComponent } from './components/central-ti/departamento-ti/gestao-de-ativos/gestao-outros/gestao-outros.component';
import { LoginComponent } from './components/central-ti/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { SolicitacaoColaboradoresDpComponent } from './components/central-ti/departamento-pessoal/solicitacao-colaboradores-dp/solicitacao-colaboradores-dp.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo:'login',
        pathMatch: 'prefix'
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ],
    },
  {
    path: '', component: NavbarComponent,
    canActivate:[AuthGuard],
    children: [
      {path: 'home',component: HomeComponent},
      {path: 'gestao-pessoal', component: GestaoPessoalComponent},
      {path: 'cadastrar-usuario', component: CadastrarUsuarioComponent},
      {path: 'solicitacao-colaboradores-dp', component: SolicitacaoColaboradoresDpComponent},
      {path: 'gestao-pessoal-ti', component: GestaoPessoalTiComponent},
      {path: 'cadastrar-ferias', component: CadastrarFeriasComponent},
      {path: 'mudanca-de-cargo', component: MudancaDeCargoComponent},
      {path: 'solicitar-cadastro', component: SolicitarCadastroComponent},
      {path: 'chamados-ti', component: ChamadosTiComponent},
      {path: 'solicitacoes-colaboradores-ti', component: SolicitacoesColaboradoresTiComponent},
      {path: 'computadores-ti', component: ComputadoresTiComponent},
      {path: 'solicitar-desligamento', component: SolicitarDesligamentoComponent},
      {path: 'visualizar-chamados-geral', component: VisualizarChamadosGeralComponent},
      {path: 'criar-chamados-geral', component: CriarChamadosGeralComponent},
      {path: 'colaboradores-dp', component: ColaboradoresDpComponent},
      {path: 'colaboradores-ti', component: ColaboradoresTiComponent},
      {path: 'gestao-impressoras-ti', component: GestaoImpressorasComponent},
      {path: 'gestao-cpd-ti', component: GestaoCpdComponent},
      {path: 'gestao-computador-ti', component: GestaoComputadorComponent},
      {path: 'gestao-monitor-ti', component: GestaoMonitorComponent},
      {path: 'gestao-outros-ti', component: GestaoOutrosComponent},
      {path: 'cadastrar-coloborador-ti', component: CadastroColaboradorTiComponent},
      {path: 'desvincular-computadores-ti', component: DesvincularComputadoresComponent},
      {path: 'modal-editar-coloboradores-ti', component: ModalEditarColaboradoresTiComponent},
      {path: 'modal-mudanca-de-cargo-dp', component: ModalMudancaDeCargoDpComponent},
      {path: 'modal-desligamento-dp', component: ModalDesligamentoDpComponent},
      {path: 'modal-colaboradores-ti', component: ModalColaboradoresTiComponent},
      {path: 'modal-ferias-dp', component: ModalFeriasDpComponent},
      {path: 'modal-colaboradores-dp', component: ModalColaboradoresDpComponent},
      {path: 'modal-cadastrar-usuario-dp', component: ModalCadastroUsuarioDpComponent},
      {path: 'modal-visualizar-chamados-geral', component: ModalVisualizarChamadosGeralComponent},
      {path: 'modal-computadores-ti', component: ModalComputadoresTiComponent},
      {path: 'modal-visualizar-ativos-ti', component: ModalVisualizarAtivosTiComponent},
      {path: 'template-comentario', component: UserInfoComponent},
      {path: 'dialog-confirmacao-cadastrar-usuario', component: DialogConfirmacaoCadastroComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
