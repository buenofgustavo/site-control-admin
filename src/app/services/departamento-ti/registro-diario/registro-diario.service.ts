import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../../authservice.service';
import { RegistroDiario } from 'src/app/interface/registroDiario';

@Injectable({
  providedIn: 'root'
})
export class RegistroDiarioService {

  private apiUrl = `${API_CONFIG.baseUrl}/registro-diario`; // Use a URL da API a partir da configuração
  private apiUrl2 = `${API_CONFIG.baseUrl}/registro-diario/listar-all`; // Use a URL da API a partir da configuração
  authToken: string | null;
  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  cadastrarRegistro(registroDiario: RegistroDiario): Observable<RegistroDiario> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.post<RegistroDiario>(this.apiUrl, registroDiario, { headers });
  }

  getAllRegistros(): Observable<RegistroDiario[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    console.log(headers)
    return this.http.get<RegistroDiario[]>(`${this.apiUrl2}`, { headers });
  }

}
