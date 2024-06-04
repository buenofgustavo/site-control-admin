import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../../authservice.service';
import { Observable } from 'rxjs';
import { ChatSolicitacoes } from 'src/app/interface/chatSolicitacoes';

@Injectable({
  providedIn: 'root'
})
export class ChatSolicitacoesService {
  
  private apiUrl = `${API_CONFIG.baseUrl}/chat`; // Use a URL da API a partir da configuração
  authToken: string | null;
  constructor(private http: HttpClient, private authService: AuthserviceService) {

    this.authToken = this.authService.extractAuthToken();
  }


  createChat(chatSolicitacoes: ChatSolicitacoes): Observable<ChatSolicitacoes[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    
    return this.http.post<ChatSolicitacoes[]>(`${this.apiUrl}`, chatSolicitacoes, { headers });
  }

  getChat(idVinculado: string): Observable<ChatSolicitacoes[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<ChatSolicitacoes[]>(`${this.apiUrl}/${idVinculado}`, { headers });
  }

}
