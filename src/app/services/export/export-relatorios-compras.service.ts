import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { API_CONFIG } from 'src/app/config/api.config';
import { AuthserviceService } from '../authservice.service';

@Injectable({
  providedIn: 'root'
})
export class ExportRelatoriosComprasService {

  private baseUrlService = `${API_CONFIG.baseUrl}/export`; // Altere para a URL da sua API Spring Boot
  authToken: string | null;

  constructor(private http: HttpClient,
    private authService: AuthserviceService
  ) { 
    this.authToken = this.authService.extractAuthToken();
  }

  exportAtivosToExcel(localizacao?: string, atualizadoPor?: string): Observable<Blob> {

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    // Aqui usamos `get` em vez de `put`, pois geralmente download de arquivos é feito via GET
    return this.http.get(`${this.baseUrlService}/ativos/${localizacao}/${atualizadoPor}`,
      {
        headers,
        responseType: 'blob'
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  exportNotebooksToExcel(filial?: string): Observable<Blob> {

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    // Aqui usamos `get` em vez de `put`, pois geralmente download de arquivos é feito via GET
    return this.http.get(`${this.baseUrlService}/notebooks/${filial}`,
      {
        headers,
        responseType: 'blob'
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  exportNotebooksInativosToExcel(): Observable<Blob> {

    const headers = new HttpHeaders().set('Authorization', `Bearer${this.authToken}`);

    // Aqui usamos `get` em vez de `put`, pois geralmente download de arquivos é feito via GET
    return this.http.get(`${this.baseUrlService}/notebooks-inativos`,
      {
        headers,
        responseType: 'blob'
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<any> {
    console.error('Erro na exportação para Excel:', error);
    throw error; // Aqui você pode tratar o erro conforme necessário
  }

}
