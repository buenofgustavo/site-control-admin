import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { Observable } from 'rxjs';
import { Computadores } from 'src/app/interface/computadores';

@Injectable({
  providedIn: 'root'
})
export class DesvincularComputadorService {

  private apiUrl = `${API_CONFIG.baseUrl}/dados-colaboradores/listar/cpf`; // Use a URL da API a partir da configuração
  private apiUrlDesvincular = `${API_CONFIG.baseUrl}/dados-colaboradores/desvincular`;
  private apiUrlMac = `${API_CONFIG.baseUrl}/computadores/listar`;


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

  desvincular(cpf: string): Observable<DadosColaboradores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.put<DadosColaboradores>(`${this.apiUrlDesvincular}/${cpf}`, null,{ headers });
  }

  buscarMac(mac: string): Observable<Computadores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<Computadores>(`${this.apiUrlMac}/${mac}`, { headers });
  }


}
