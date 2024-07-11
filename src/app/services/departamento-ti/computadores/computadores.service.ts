import { Injectable } from '@angular/core';
import { AuthserviceService } from '../../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable } from 'rxjs';
import { Computadores } from 'src/app/interface/computadores';
import { LogComputadores } from 'src/app/interface/logComputadores';

@Injectable({
  providedIn: 'root'
})
export class ComputadoresService {

  private apiUrl = `${API_CONFIG.baseUrl}/computadores/listar`; // Use a URL da API a partir da configuração
  private apiUrl2 = `${API_CONFIG.baseUrl}/computadores`; // Use a URL da API a partir da configuração
  private apiUrl3 = `${API_CONFIG.baseUrl}/computadores/editar`; // Use a URL da API a partir da configuração
  private apiUrl4 = `${API_CONFIG.baseUrl}/log-computadores`; // Use a URL da API a partir da configuração
  private apiUrl5 = `${API_CONFIG.baseUrl}/computadores/editar-status`; // Use a URL da API a partir da configuração

  authToken: string | null;
  
  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  getAllComputadores(): Observable<Computadores[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<Computadores[]>(`${this.apiUrl}`, { headers });
  }

  deletarAtivos(MAC: string): Observable<Computadores> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.delete<Computadores>(`${this.apiUrl2}/deletar/${MAC}`, { headers });
  }

  salvarSerial(MAC: string, serial: string): Observable<Computadores> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.put<Computadores>(`${this.apiUrl3}/${MAC}/${serial}`, null, { headers });
  }

  salvarStatus(MAC: string, status: string): Observable<Computadores> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.put<Computadores>(`${this.apiUrl5}/${MAC}/${status}`, null, { headers });
  }

  createChat(chatSolicitacoes: LogComputadores): Observable<LogComputadores[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    
    return this.http.post<LogComputadores[]>(`${this.apiUrl4}`, chatSolicitacoes, { headers });
  }

  getChat(macVinculado: string): Observable<LogComputadores[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<LogComputadores[]>(`${this.apiUrl4}/${macVinculado}`, { headers });
  }

  getLog(): Observable<LogComputadores[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.get<LogComputadores[]>(`${this.apiUrl4}/listar-all`, { headers });
  }

}
