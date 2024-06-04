import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Credenciais } from 'src/app/interface/credenciais';
import { AuthserviceService } from 'src/app/services/authservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    login: new FormControl(null, Validators.email),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  creds: Credenciais = {
    login: '',
    password: ''
  }
  login = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: AuthserviceService,
    private router: Router,
    private toastr: NbToastrService) { }

  ngOnInit(): void {
    this.clearLocalStorage();
  }
  logar() {
    const login = this.loginForm.get('login')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    if (!login || !password) {
      this.toastr.warning('Por favor, preencha todos os campos.', 'Erro no login');
      return;  // Evitar a execução do código seguinte se as credenciais estiverem vazias
    }

    this.service.authenticate({login,password}).subscribe(
      resposta => {
        const authorizationHeader = resposta.body;
        if (authorizationHeader) {
          const token = authorizationHeader.substring(7);
          this.service.sucessfulLogin(token);

          // Exibir toastr de sucesso antes de redirecionar
          this.toastr.success('Usuário logado com sucesso!', 'Login');
          console.log('Redirecionando para a página home.');

          // Adicionando um pequeno atraso antes de redirecionar (opcional)
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 500); // Ajuste o valor conforme necessário
        } else {
          this.toastr.danger('Token de autorização não encontrado na resposta.', 'Erro no login');
          console.error('Token de autorização não encontrado na resposta.');
        }
      },
      error => {
        if (error.status === 400) {
          this.toastr.warning('Credenciais inválidas. Verifique seu email e senha.', 'Erro no login');
        } else if (error.status === 401) {
          this.toastr.warning('Requisição inválida. Verifique os dados enviados.', 'Erro no login');
        } else {
          this.toastr.warning('Falha ao fazer login. Tente novamente mais tarde.', 'Erro no login');
        }
        console.error('Erro ao fazer login:', error);
      }
    );
  }
  clearLocalStorage(): void {
    localStorage.clear();
  }
}














