import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GestaoAtivos } from 'src/app/interface/gestaoAtivos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestaoAtivosService {

  private apiUrl = `${API_CONFIG.baseUrl}/gestao-ativos/listar-tipo`; // Use a URL da API a partir da configuração
  private apiUrl2 = `${API_CONFIG.baseUrl}/gestao-ativos`; // Use a URL da API a partir da configuração
  authToken: string | null;
  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrarAtivos(gestaoAtivos: GestaoAtivos): Observable<GestaoAtivos> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.post<GestaoAtivos>(this.apiUrl2, gestaoAtivos, { headers });

  }

  getAllAtivos(tipo: string): Observable<GestaoAtivos[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    console.log(headers)
    return this.http.get<GestaoAtivos[]>(`${this.apiUrl}/${tipo}`, { headers });
  }

  atualizarAtivos(gestaoAtivos: GestaoAtivos): Observable<GestaoAtivos> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.put<GestaoAtivos>(this.apiUrl2, gestaoAtivos, { headers });
  }

  deletarAtivos(id: string): Observable<GestaoAtivos> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.delete<GestaoAtivos>(`${this.apiUrl2}/${id}`, { headers });
  }

}
