import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ChatSolicitacoes } from 'src/app/interface/chatSolicitacoes';
import { Departamentos } from 'src/app/interface/departamento';
import { DocumentosColaboradores } from 'src/app/interface/documentosColaboradores';
import { Filiais } from 'src/app/interface/filiais';
import { SolicitacaoAssociadaColaborador } from 'src/app/interface/solicitacaoAssociadaColaborador';
import { Usuario } from 'src/app/interface/usuario-interface';
import { CadastroColaboradorService } from 'src/app/services/departamento-pessoal/cadastro-colaborador/cadastro-colaborador.service';
import { ChatSolicitacoesService } from 'src/app/services/departamento-pessoal/chat-solicitacoes/chat-solicitacoes.service';
import { DepartamentoFiliaisService } from 'src/app/services/select-departamentos-filiais/departamento-filiais.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-modal-visualizar-solicitacoes',
  templateUrl: './modal-visualizar-solicitacoes.component.html',
  styleUrls: ['./modal-visualizar-solicitacoes.component.scss']
})
export class ModalVisualizarSolicitacoesComponent {


  chatDTO: ChatSolicitacoes = {
    message: "",
    idVinculado: "",
    datahora: "",
    usuario: "",
    nomeUser: ""
  }

  chatSolicitacoes: ChatSolicitacoes[] = [];



  sendMessage(): void {
    if (this.chatDTO.message) {
      const newMessage: ChatSolicitacoes = {
        message: this.chatDTO.message,
        idVinculado: this.data.solicitacaoAssociadaColaborador.id, // Substitua pela NFD real vinculada
        datahora: new Date().toISOString(), // Data e hora atual
        usuario: this.usuario.login, // Substitua pelo nome do usuário real
        nomeUser: this.usuario.name
      };
  
      // Aqui você pode chamar sua função para criar a mensagem no backend
      // this.criarMensagem(newMessage);
  
      // Adicione a nova mensagem à lista de mensagens
      this.criarMensagem(newMessage);
      this.chatSolicitacoes.push(newMessage);
  
      // Limpa o campo de mensagem após o envio
      this.chatDTO.message = ''
    } else {
      // Exibe uma mensagem de erro se o campo de mensagem estiver vazio
      this.toastrService.danger('Por favor, digite uma mensagem', 'Erro');
    }
  }

  usuario: Usuario = {
    name: '',
    login: '',
    password: '',
    role: '',
  }

  loadUser() {
    this.usuarioService.getUserByEmail().subscribe(
      (user: Usuario) => {
        this.usuario =  user; // Armazene os dados do Pessoa na variável local

      },
      (error) => {
        console.error('Erro ao carregar dados do Pessoa:', error);
      }
    );
  }

  criarMensagem(newMessage: ChatSolicitacoes) {
    console.log(newMessage)
    this.chatSolicitacoesService.createChat(newMessage).subscribe(
      () => {
        console.log('Mensagem criada com sucesso!');
        // Realizar ações adicionais após a criação da mensagem
      },
      error => {
        console.error('Erro ao criar mensagem:', error);
        this.toastrService.danger('Erro ao enviar a mensagem', 'Erro');
      }
    );
  }

  fetchChatMessages(): void {
    this.chatSolicitacoesService.getChat(this.data.solicitacaoAssociadaColaborador.id).subscribe(
      (messages: ChatSolicitacoes[]) => {
        // Process and assign fetched messages to this.chatSolicitacoes array
        this.chatSolicitacoes = messages.map((msg) => ({
          message: msg.message,
          idVinculado: msg.idVinculado,
          datahora: msg.datahora, // Você pode modificar isso conforme o formato real da data da sua API
          usuario: msg.usuario,
          nomeUser: msg.nomeUser
        }));
      },
      (error) => {
        console.error('Erro ao buscar mensagens de chat:', error);
        this.toastrService.danger('Erro ao buscar mensagens do chat', 'Erro');
      }
    );
  }


  dados: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private chatSolicitacoesService: ChatSolicitacoesService,
              private usuarioService: UsuarioService,
              private cadastroColaboradorService: CadastroColaboradorService,
              private toastrService: NbToastrService,private router:Router,
  
) {
    this.dados = data.dados;
  }
  
  ngOnInit(): void {
    this.loadUser();
    this.fetchChatMessages();
    this.checkDocumentAvailability(); // Verifica a disponibilidade do documento ao iniciar o componente
  }

  hasDocument: boolean = false;


  arquivos: DocumentosColaboradores = {
    id: null,
    nomeArquivo: '',
    cpf: ''
  }

  openImage(): void {   
    this.cadastroColaboradorService.getDocumentos(this.data.solicitacaoAssociadaColaborador.cpf).subscribe(
      (data2: DocumentosColaboradores | null) => {
        try {
          if (data2) {
            this.arquivos = data2;
            if (this.arquivos) {
              const imageUrl = `../../../../assets/img-uploads/files-documentos/${this.arquivos.cpf}_${this.arquivos.nomeArquivo}`;
              console.log(imageUrl)
              window.open(imageUrl, '_blank');
          } 

          } else {
            this.toastrService.danger('Não possui arquivo.', 'Erro');
            throw new Error('Erro ao abrir arquivo.');
          }
        } catch (error) {
          console.log('Erro ao abrir arquivo.', error);
          this.toastrService.danger('Erro ao abrir arquivo.', 'Erro');
        } 
      },
      error =>{
        if(error.error && error.error.message){
          this.toastrService.warning(error.error.message, "Erro");
  
        }
        else{
          this.toastrService.warning('Erro ao buscar arquivos!', "Erro");
        }
      }
    )
  }

  checkDocumentAvailability(): void {
    this.cadastroColaboradorService.getDocumentos(this.data.solicitacaoAssociadaColaborador.cpf).subscribe(
      (data2: DocumentosColaboradores | null) => {
        this.hasDocument = !!data2;
      },
      error => {
        this.hasDocument = false;
      }
    );
  }

}
