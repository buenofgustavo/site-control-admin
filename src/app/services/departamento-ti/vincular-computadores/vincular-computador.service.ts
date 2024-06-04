import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../../authservice.service';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { Observable } from 'rxjs';
import { Computadores } from 'src/app/interface/computadores';
import { Acessos } from 'src/app/interface/acessos';

@Injectable({
  providedIn: 'root'
})
export class VincularComputadorService {

  private apiUrl = `${API_CONFIG.baseUrl}/dados-colaboradores/listar/cpf`; // Use a URL da API a partir da configuração
  private apiUrlMac = `${API_CONFIG.baseUrl}/computadores/listar`;
  private apiUrlVincular = `${API_CONFIG.baseUrl}/dados-colaboradores/vincular`;
  private apiUrlAcessos = `${API_CONFIG.baseUrl}/acessos/editar`;
  
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

  computadores: Computadores = {
    nomeUsuario: "",
    nomeComputador: "",
    localizacao: "",
    memoriaRam: "",
    capacidadeArmazenamento: "",
    marca: "",
    modelo: "",
    processador: "",
    sistemaOperacional: "",
    makroInstalado: "",
    versaoMakro: "",   
    enderecoMac: "",
    userAtual: "",
    lastUser: "",
    nomeUserAtual: "",
    nomeLastUser: ""
  }

  acessos: Acessos = {
    cpf: "",
    vr: "",
    gmail: "",
    freteBras: "",
    zoho: "",
    szChat: "",
    centralTi: "",
    criadoPor: "",
    atualizadoPor: ""
  }

  buscarMac(mac: string): Observable<Computadores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
    console.log(headers)

    return this.http.get<Computadores>(`${this.apiUrlMac}/${mac}`, { headers });
  }

  vincular(cpf: string, mac: string): Observable<DadosColaboradores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.put<DadosColaboradores>(`${this.apiUrlVincular}/${cpf}/${mac}`, null, { headers });
  }

  criarAcessos(acessos: Acessos): Observable<DadosColaboradores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.put<DadosColaboradores>(`${this.apiUrlAcessos}`, acessos, { headers });
  }


}
