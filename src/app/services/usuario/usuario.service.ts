import { Injectable } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONFIG } from 'src/app/config/api.config';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/interface/usuario-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${API_CONFIG.baseUrl}/auth/register`; // Use a URL da API a partir da configuração
  private apiUrl2 = `${API_CONFIG.baseUrl}/auth`; // Use a URL da API a partir da configuração

  authToken: string | null;

  constructor(private http: HttpClient, private authService: AuthserviceService) {
    this.authToken = this.authService.extractAuthToken();
  }



  cadastrarUsuario(usuario: Usuario): Observable<Usuario>{

    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.post<Usuario>(this.apiUrl, usuario, { headers });

  }

  getUserByEmail(): Observable<Usuario> {
    if(!this.authToken){
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    return this.http.get<Usuario>(`${this.apiUrl2}/user`, { headers });
  }


}