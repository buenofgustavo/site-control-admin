import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filiais } from 'src/app/interface/filiais';
import { Usuario } from 'src/app/interface/usuario-interface';
import { ExportRelatoriosComprasService } from 'src/app/services/export/export-relatorios-compras.service';
import { DepartamentoFiliaisService } from 'src/app/services/select-departamentos-filiais/departamento-filiais.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-modal-relatorios',
  templateUrl: './modal-relatorios.component.html',
  styleUrls: ['./modal-relatorios.component.scss']
})
export class ModalRelatoriosComponent {
  dados: any;

  filial: Filiais[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private departamentoFiliaisService: DepartamentoFiliaisService,
    private exportRelatoriosComprasService: ExportRelatoriosComprasService,
  ) {
    this.dados = data.dados;
  }

  ngOnInit(): void {
    this.loadUser();
    this.getFiliais()
  }

  usuario: Usuario = {
    name: '',
    login: '',
    password: '',
    role: '',
  }

  users: string = ''
  unidade: string = 'todos'

  loadUser() {
    this.usuarioService.getUserByEmail().subscribe(
      (user: Usuario) => {
        this.usuario = user; // Armazene os dados do Pessoa na variável local
        this.users = this.usuario.login
      },
      (error) => {
        console.error('Erro ao carregar dados do Pessoa:', error);
      }
    );
  }

  getFiliais(): void {
    this.departamentoFiliaisService.getAllFiliais().subscribe(filiais => {
      this.filial = filiais.sort((a, b) => {
        return a.filiais.localeCompare(b.filiais);
      });
      console.log(filiais);
    });
  }

  gerarRelatorio() {
    // Chama o serviço para exportar para Excel
    this.exportRelatoriosComprasService.exportAtivosToExcel(this.unidade, this.users).subscribe(
      (data) => {
        // Manipula o arquivo Excel retornado, se necessário
        this.downloadFile(data);
      },
      (error) => {
        // Trata erros de requisição
        console.error('Erro ao exportar para Excel:', error);
        // Implemente o tratamento de erro adequado
      }
    );
  }

  private downloadFile(data: Blob) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    // Cria um link temporário e faz o download do arquivo
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;

    const agora = new Date();

    // Formatação da data
    const dia = agora.getDate().toString().padStart(2, '0'); // Dia com dois dígitos
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0'); // Mês com dois dígitos
    const ano = agora.getFullYear().toString().slice(-2); // Ano com dois dígitos
    
    // Formatação da hora
    const hora = agora.getHours().toString().padStart(2, '0'); // Horas com dois dígitos
    const minuto = agora.getMinutes().toString().padStart(2, '0'); // Minutos com dois dígitos
    
    // Montando a string no formato desejado
    const dia_hora = `${dia}.${mes}.${ano}-${hora}.${minuto}`;
    
    a.download = `Relatorio_Control_${dia_hora}.xlsx`; // Nome do arquivo a ser baixado
    a.click();

    // Limpa o URL criado
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

}

