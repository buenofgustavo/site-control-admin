import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../../authservice.service';
import { DadosColaboradores } from 'src/app/interface/dados-colaboradores';
import { Observable } from 'rxjs';
import { DocumentosColaboradores } from 'src/app/interface/documentosColaboradores';

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

  private apiUrl2 = `${API_CONFIG.baseUrl}/documentos-colaboradores/arquivos`; // Use a URL da API a partir da configuração
  private apiUrl3 = `${API_CONFIG.baseUrl}/documentos-colaboradores/listar`;
  cadastrarDocumentosColaboradores(files: FileList, cpf: String): Observable<DadosColaboradores> {
    if (!this.authToken) {
      throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], files[i].name);
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);
  
    // Enviando a requisição com o FormData
    return this.http.post<DadosColaboradores>(`${this.apiUrl2}/${cpf}`, formData, { headers });
  }

  getDocumentos(cpf: string): Observable<DocumentosColaboradores> {
    if (!this.authToken) {
        throw new Error('Token JWT não encontrado, refaça o Login!');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    return this.http.get<DocumentosColaboradores>(`${this.apiUrl3}/${cpf}`, { headers });
  }

}
