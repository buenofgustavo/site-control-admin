import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { AuthserviceService } from '../../authservice.service';

@Injectable({
  providedIn: 'root'
})
export class DesligarColaboradorService {

  private apiUrl = `${API_CONFIG.baseUrl}/dados-colaboradores/listar/cpf`; // Use a URL da API a partir da configuração
  private apiUrl1 = `${API_CONFIG.baseUrl}/dados-colaboradores/listar/ativos`; // Use a URL da API a partir da configuração
  private apiUrlDesligar = `${API_CONFIG.baseUrl}/dados-colaboradores/desligar`;
  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  buscarColaboradorPorCPF(cpf: string): Observable<DadosColaboradores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<DadosColaboradores>(`${this.apiUrl}/${cpf}`, { headers });
  }



  desligar(cpf: string): Observable<DadosColaboradores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.put<DadosColaboradores>(`${this.apiUrlDesligar}/${cpf}`, null,{ headers });
  }

}
