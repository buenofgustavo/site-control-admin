import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../../authservice.service';
import { SolicitacaoAssociadaColaborador } from 'src/app/interface/solicitacaoAssociadaColaborador';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoAssociadaColaboradorService {
  private apiUrl = `${API_CONFIG.baseUrl}/solicitacao-associada-colaborador/listar`; // Use a URL da API a partir da configuração
  private apiUrl2 = `${API_CONFIG.baseUrl}/solicitacao-associada-colaborador/editar`; // Use a URL da API a partir da configuração
  
  authToken: string | null;
  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  getAllSolicitacoes(): Observable<SolicitacaoAssociadaColaborador[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    console.log(headers)
    return this.http.get<SolicitacaoAssociadaColaborador[]>(`${this.apiUrl}`, { headers });
  }

  modificarStatus(id: number, status: string): Observable<SolicitacaoAssociadaColaborador> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    console.log(headers)
    console.log(`${this.apiUrl2}/${id}/${status}`)
    return this.http.put<SolicitacaoAssociadaColaborador>(`${this.apiUrl2}/${id}/${status}`, null, { headers:headers });
  }

}
