import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../../authservice.service';
import { API_CONFIG } from 'src/app/config/api.config';
import { ColaboradorCompleto } from 'src/app/interface/colaboradorCompleto';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  private apiUrl = `${API_CONFIG.baseUrl}/colaboradores/listar`; // Use a URL da API a partir da configuração
  private apiUrl1 = `${API_CONFIG.baseUrl}/dados-colaboradores/listar/ativos`; // Use a URL da API a partir da configuração
  private apiUrl2 = `${API_CONFIG.baseUrl}/dados-colaboradores/termo-assinado`; // Use a URL da API a partir da configuração
  
  authToken: string | null;
  
  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  getAllColaboradores(): Observable<ColaboradorCompleto[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<ColaboradorCompleto[]>(`${this.apiUrl}`, { headers });
  }

  assinarTermo(cpf: string): Observable<ColaboradorCompleto[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.put<ColaboradorCompleto[]>(`${this.apiUrl2}/${cpf}`, null ,{ headers });
  }

  getAllDadosColaboradores(): Observable<DadosColaboradores[]> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<DadosColaboradores[]>(`${this.apiUrl1}`, { headers });
  }

  buscarColaboradorPorCPF(cpf: string): Observable<DadosColaboradores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<DadosColaboradores>(`${this.apiUrl}/${cpf}`, { headers });
  }


}
