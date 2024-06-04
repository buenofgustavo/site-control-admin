import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../../authservice.service';
import { Observable } from 'rxjs';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';

@Injectable({
  providedIn: 'root'
})
export class MudancaDeCargoService {

  private apiUrl = `${API_CONFIG.baseUrl}/dados-colaboradores/listar/cpf`; // Use a URL da API a partir da configuração
  private apiUrlMac = `${API_CONFIG.baseUrl}/computadores/listar`;
  private apiUrlMudanca = `${API_CONFIG.baseUrl}/dados-colaboradores/mudanca-de-cargo`;
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

  mudancaCargo(dadosColaboradores: DadosColaboradores): Observable<DadosColaboradores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.put<DadosColaboradores>(`${this.apiUrlMudanca}`, dadosColaboradores, { headers });
  }

}
