import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../authservice.service';
import { Chamados } from 'src/app/interface/chamados';
import { Observable } from 'rxjs';
import { FileChamados } from 'src/app/interface/filesChamados';
import { ChatChamados } from 'src/app/interface/chatChamados';

@Injectable({
  providedIn: 'root'
})
export class ChamadosService {


  private apiUrl = `${API_CONFIG.baseUrl}/chamados`;
  private apiUrl2 = `${API_CONFIG.baseUrl}/chamados/arquivos`;
  private apiUrl3 = `${API_CONFIG.baseUrl}/chamados/listar-arquivos`;
  private apiUrl4 = `${API_CONFIG.baseUrl}/chat-chamados`;
  private apiUrl5 = `${API_CONFIG.baseUrl}/chat-chamados/arquivos`;

  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrarChamados(chamados: Chamados): Observable<Chamados> {
    if (!this.authToken) {
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
  
    // Enviando a requisição com o FormData
    return this.http.post<Chamados>(this.apiUrl, chamados, { headers });
  }



  cadastrarArquivosChamados(files: FileList, id: String): Observable<Chamados> {
    if (!this.authToken) {
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    const idString: string = id.toString()
    formData.append('id', idString);
  
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
  
    // Enviando a requisição com o FormData
    return this.http.post<Chamados>(this.apiUrl2, formData, { headers });
  }

  getAllChamados(): Observable<Chamados[]> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<Chamados[]>(`${this.apiUrl}`, { headers });
  }

  getAllChamadosPorUsuario(usuario: string): Observable<Chamados[]> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<Chamados[]>(`${this.apiUrl}/listar-usuario/${usuario}`, { headers });
  }

  getAllFilesChamados(id: string): Observable<FileChamados[]> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<FileChamados[]>(`${this.apiUrl3}/${id}`, { headers });
  }

  createChat(chatSolicitacoes: ChatChamados): Observable<ChatChamados> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    
    return this.http.post<ChatChamados>(`${this.apiUrl4}`, chatSolicitacoes, { headers });
  }

  getChat(id: string): Observable<ChatChamados[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<ChatChamados[]>(`${this.apiUrl4}/${id}`, { headers });
  }

  cadastrarArquivosChatChamados(files: FileList, id: String, idChamado: number): Observable<Chamados> {
    if (!this.authToken) {
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
    const idString: string = id.toString()
    formData.append('id', idString);
  
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
  
    // Enviando a requisição com o FormData
    return this.http.post<Chamados>(`${this.apiUrl5}/${idChamado}`, formData, { headers });
  }

  modificarStatus(id: number, status: string): Observable<Chamados> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    console.log(headers)
    console.log(`${this.apiUrl2}/${id}/${status}`)
    return this.http.put<Chamados>(`${this.apiUrl}/editar/${id}/${status}`, null, { headers:headers });
  }

}

