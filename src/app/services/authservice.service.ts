import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/interface/usuario-interface';
import { Credenciais } from '../interface/credenciais';
import { API_CONFIG } from '../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private jwtservice: JwtHelperService = new JwtHelperService();
  private usuarioSubject = new BehaviorSubject<{ nome: string | null, perfis: string[] | null }>({ nome: null, perfis: null });

  constructor(private http: HttpClient) { }

  authenticate(creds: Credenciais) {
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: 'response',
      responseType: 'text'
    });
  }

  sucessfulLogin(authToken: string) {
    localStorage.setItem('token', authToken);
    this.updateUserData();
    console.log('Login bem-sucedido. Token:', authToken);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    if (token != null) {
      return !this.jwtservice.isTokenExpired(token);
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.updateUserData();
    console.log('Logout realizado.');
  }

  getUsuarioLogado(): string | null {
    const token = localStorage.getItem('token');
    return token ? this.jwtservice.decodeToken(token)?.sub : null;
  }

  getUsuarioObservable() {
    return this.usuarioSubject.asObservable();
  }

  private updateUserData() {
    const token = localStorage.getItem('token');
    const decodedToken = token ? this.jwtservice.decodeToken(token) : null;

    const nome = decodedToken ? decodedToken.name : null;
    const perfis = decodedToken ? decodedToken.profiles : null;

    this.usuarioSubject.next({ nome, perfis });
  }
    // AuthService

    hasPermission(allowedProfiles: string[]): boolean {
      const token = localStorage.getItem('token');
      const decodedToken = token ? this.jwtservice.decodeToken(token) : null;
    
      // Verificar se o perfil está incluído nos perfis permitidos
      const perfil = decodedToken ? decodedToken.profile : null;
      console.log(perfil);
    
      return perfil && allowedProfiles.includes(perfil);
    }

  extractAuthToken(): string | null {
    // Recupera o token JWT do localStorage
    const fulltoken = localStorage.getItem('token');

    if (fulltoken) {
      // Encontrar o índice inicial do token
      const startIndex = fulltoken.indexOf('') + 3;
      // Encontrar o índice final do token
      const endIndex = fulltoken.length - 2;

      // Extrair o token com base nos índices
      return fulltoken.substring(startIndex, endIndex);
    } else{
        return null
    }
}

}