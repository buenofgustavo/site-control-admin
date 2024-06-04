import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Chamados } from 'src/app/interface/chamados';
import { ChamadosService } from 'src/app/services/chamados/chamados.service';
import { FileChamados } from 'src/app/interface/filesChamados';
import { ChatChamados } from 'src/app/interface/chatChamados';
import { Usuario } from 'src/app/interface/usuario-interface';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-modal-visualizar-chamados-geral',
  templateUrl: './modal-visualizar-chamados-geral.component.html',
  styleUrls: ['./modal-visualizar-chamados-geral.component.scss']
})
export class ModalVisualizarChamadosGeralComponent {

  arquivos: FileChamados[] = [];

  dados: any;
  idNewMensagem: string = '';

  constructor(private dialogRef: MatDialogRef<ModalVisualizarChamadosGeralComponent>,
    private toastrService: NbToastrService,
    private chamadosService: ChamadosService,
    private usuarioService: UsuarioService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: { chamados: Chamados }) {
      console.log(data)
  }

  openImage(): void {   
    this.chamadosService.getAllFilesChamados(this.data.chamados.id).subscribe(
      (data2: FileChamados[] | null) => {
        try {
          if (data2 !== null && data2.length > 0) {
            console.log(data2)
            this.arquivos = data2;

            for (const arquivo of this.arquivos) {
              console.log(arquivo.nomeArquivo, arquivo.numeroChamado)
              const imageUrl = `../../../../assets/img-uploads/files-chamados/${arquivo.numeroChamado}_${arquivo.nomeArquivo}`;
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
          this.toastrService.warning('Erro ao cadastrar acessos!', "Erro");
        }
      }
    )
  }

  openImageChat(id: string, arquivo: string): void {   
    console.log(this.chatChamados)
    console.log(id)
    if (arquivo) {
        console.log(this.data.chamados.id, id, arquivo)
        const imageUrl = `../../../../assets/img-uploads/files-chat-chamados/${this.data.chamados.id}_${id}_${arquivo}`;
        console.log(imageUrl)
        window.open(imageUrl, '_blank');
    } 
  }

  ngOnInit(): void {
    this.loadUser();
    this.fetchChatMessages();
  }

  chatDTO: ChatChamados = {
    id: '',
    message: "",
    numeroChamado: 0,
    userVinculado: "",
    nomeUser: "",
    arquivo: "",
    datahora: ""
  }

  chatChamados: ChatChamados[] = [];


  sendMessage(): void {

    if (this.chatDTO.message) {
      const newMessage: ChatChamados = {
        message: this.chatDTO.message,
        numeroChamado: Number(this.data.chamados.id), // Substitua pela NFD real vinculada
        userVinculado: this.usuario.login, // Substitua pelo nome do usuário real
        nomeUser: this.usuario.name,
        arquivo: this.chatDTO.arquivo,
        datahora: new Date().toISOString(), // Data e hora atual
      };
      
      this.idNewMensagem = this.criarMensagem(newMessage);
      newMessage.id = this.idNewMensagem;
      this.chatChamados.push(newMessage);
      
      
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

  criarMensagem(newMessage: ChatChamados) {
    this.chamadosService.createChat(newMessage).subscribe(
      response =>{
        const novaMensagemId = response.id;
        console.log('Mensagem criada com sucesso!');
        if(this.filesToUpload === null){
          this.toastrService.success("Mensagem sem arquivo cadastrado com sucesso !", "Sucesso");
          return response.id;
        }
        else {
          this.chamadosService.cadastrarArquivosChatChamados(this.filesToUpload, novaMensagemId, newMessage.numeroChamado).subscribe(
            response =>{
              this.toastrService.success("Mensagem com arquivo enviada com sucesso!", "Sucesso");
            }
 
          )
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/visualizar-chamados-geral']); // Navega para a rota de cadastro de armazém
            });
          }, 2500); 
          this.clearFileInput();
          return response.id;
        }
      },
      error => {
        console.error('Erro ao criar mensagem:', error);
        this.toastrService.danger('Erro ao enviar a mensagem', 'Erro');
      }
    );
    return ''
  }

  fetchChatMessages(): void {
    this.chamadosService.getChat(this.data.chamados.id).subscribe(
      (messages: ChatChamados[]) => {
        // Process and assign fetched messages to this.chatSolicitacoes array
        this.chatChamados = messages.map((msg) => ({
          id: msg.id,
          message: msg.message,
          numeroChamado: msg.numeroChamado, // Você pode modificar isso conforme o formato real da data da sua API
          userVinculado: msg.userVinculado,
          nomeUser: msg.nomeUser,
          arquivo: msg.arquivo,
          datahora: msg.datahora
        }));
      },
      (error) => {
        console.error('Erro ao buscar mensagens de chat:', error);
        this.toastrService.danger('Erro ao buscar mensagens do chat', 'Erro');
      }
    );
  }

  onFileChange(event: any) {
    this.filesToUpload = event.target.files;
  }

  filesToUpload: FileList | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;
  clearFileInput() {
    this.fileInput.nativeElement.value = '';
  }

}



