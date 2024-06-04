import { Injectable } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Departamentos } from 'src/app/interface/departamento';
import { Observable } from 'rxjs';
import { Computadores } from 'src/app/interface/computadores';
import { Filiais } from 'src/app/interface/filiais';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoFiliaisService {

  private apiUrl = `${API_CONFIG.baseUrl}/departamentos`; // Use a URL da API a partir da configuração
  private apiUrl2 = `${API_CONFIG.baseUrl}/filiais`; // Use a URL da API a partir da configuração
  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  getAllDepartamentos(): Observable<Departamentos[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<Departamentos[]>(`${this.apiUrl}`, { headers });
  }

  getAllFiliais(): Observable<Filiais[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<Filiais[]>(`${this.apiUrl2}`, { headers });
  }

}
