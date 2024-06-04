import { Injectable } from '@angular/core';
import { AuthserviceService } from '../../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable } from 'rxjs';
import { Computadores } from 'src/app/interface/computadores';

@Injectable({
  providedIn: 'root'
})
export class ComputadoresService {

  private apiUrl = `${API_CONFIG.baseUrl}/computadores/listar`; // Use a URL da API a partir da configuração
  authToken: string | null;
  
  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }

  getAllComputadores(): Observable<Computadores[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<Computadores[]>(`${this.apiUrl}`, { headers });
  }
}
