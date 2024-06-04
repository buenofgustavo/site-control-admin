import { Component, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject  } from '@angular/core';
import { ChatSolicitacoes } from 'src/app/interface/chatSolicitacoes';
import { ChatSolicitacoesService } from 'src/app/services/departamento-pessoal/chat-solicitacoes/chat-solicitacoes.service';
import { Usuario } from 'src/app/interface/usuario-interface';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
@Component({
  selector: 'app-modal-cadastro-usuario-dp',
  templateUrl: './modal-cadastro-usuario-dp.component.html',
  styleUrls: ['./modal-cadastro-usuario-dp.component.scss']
})
export class ModalCadastroUsuarioDpComponent{

  ngOnInit(): void {
    this.loadUser();
    this.fetchChatMessages();

  }

  chatDTO: ChatSolicitacoes = {
    message: "",
    idVinculado: "",
    datahora: "",
    usuario: "",
    nomeUser: ""
  }

  chatSolicitacoes: ChatSolicitacoes[] = [];

  mensagem: string = '';
  comentarios: string[] = [];

  sendMessage(): void {
    if (this.mensagem) {
      const newMessage: ChatSolicitacoes = {
        message: this.mensagem,
        idVinculado: this.data, // Substitua pela NFD real vinculada
        datahora: new Date().toISOString(), // Data e hora atual
        usuario: this.usuario.login, // Substitua pelo nome do usuário real
        nomeUser: this.usuario.name
      };
  
      // Aqui você pode chamar sua função para criar a mensagem no backend
      // this.criarMensagem(newMessage);
  
      // Adicione a nova mensagem à lista de mensagens
      this.criarMensagem();
      this.chatSolicitacoes.push(newMessage);
  
      // Limpa o campo de mensagem após o envio
      this.mensagem = '';
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

  criarMensagem() {
    const chatMessageDTO: ChatSolicitacoes =  this.chatDTO;
    this.chatSolicitacoesService.createChat(chatMessageDTO).subscribe(
      () => {
        console.log('Mensagem criada com sucesso!');
        // Realizar ações adicionais após a criação da mensagem
      },
      error => {
        console.error('Erro ao criar mensagem:', error);
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
      console.log(messages)},
      (error) => {
        console.error('Erro ao buscar mensagens de chat:', error);
      }
    );
  }


  dados: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private chatSolicitacoesService: ChatSolicitacoesService,
              private usuarioService: UsuarioService,
              private toastrService: NbToastrService,private router:Router,
  
) {
    console.log(data)
    this.dados = data.dados;
  }
  
}
