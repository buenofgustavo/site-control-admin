import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../../authservice.service';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroColaboradorService {

  private apiUrl = `${API_CONFIG.baseUrl}/dados-colaboradores/cadastrar`; // Use a URL da API a partir da configuração

  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrarColaborador(dadosColaboradores: DadosColaboradores): Observable<DadosColaboradores> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.post<DadosColaboradores>(this.apiUrl, dadosColaboradores, { headers });

  }

}
