import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { Computadores } from 'src/app/interface/computadores';
import { LogComputadores } from 'src/app/interface/logComputadores';
import { Usuario } from 'src/app/interface/usuario-interface';
import { ComputadoresService } from 'src/app/services/departamento-ti/computadores/computadores.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModalComputadoresTiComponent } from '../modal-computadores-ti/modal-computadores-ti.component';

@Component({
  selector: 'app-modal-log-computadores',
  templateUrl: './modal-log-computadores.component.html',
  styleUrls: ['./modal-log-computadores.component.scss']
})
export class ModalLogComputadoresComponent {
  constructor(private dialogRef: MatDialogRef<ModalComputadoresTiComponent>,
    private toastrService: NbToastrService,
    private computadoresService: ComputadoresService,
    private usuarioService: UsuarioService,
    @Inject(MAT_DIALOG_DATA) public data: { computadoresCompleto: Computadores }) {
    console.log(data)
  }

  chatDTO: LogComputadores = {
    message: "",
    userVinculado: "",
    macVinculado: "",
    computadorVinculado: "",
    datahora: "",
    nomeUser: ""
  }

  chatSolicitacoes: LogComputadores[] = [];



  sendMessage(): void {
    if (this.chatDTO.message) {
      const newMessage: LogComputadores = {
        message: this.chatDTO.message,
        userVinculado: this.usuario.login, // Substitua pelo nome do usuário real
        macVinculado: this.data.computadoresCompleto.enderecoMac, // Substitua pela NFD real vinculada
        computadorVinculado: this.data.computadoresCompleto.nomeComputador, // Substitua pela NFD real vinculada
        datahora: new Date().toISOString(), // Data e hora atual
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

  criarMensagem(newMessage: LogComputadores) {
    console.log(newMessage)
    this.computadoresService.createChat(newMessage).subscribe(
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
    this.computadoresService.getChat(this.data.computadoresCompleto.enderecoMac).subscribe(
      (messages: LogComputadores[]) => {
        // Process and assign fetched messages to this.chatSolicitacoes array
        this.chatSolicitacoes = messages.map((msg) => ({
          message: msg.message,
          userVinculado: msg.userVinculado,
          macVinculado: msg.macVinculado,
          computadorVinculado: msg.computadorVinculado,
          datahora: msg.datahora, // Você pode modificar isso conforme o formato real da data da sua API
          nomeUser: msg.nomeUser
        }));
      },
      (error) => {
        console.error('Erro ao buscar mensagens de chat:', error);
        this.toastrService.danger('Erro ao buscar mensagens do chat', 'Erro');
      }
    );
  }

  ngOnInit(): void {
    this.loadUser();
    this.fetchChatMessages();
  }

}

