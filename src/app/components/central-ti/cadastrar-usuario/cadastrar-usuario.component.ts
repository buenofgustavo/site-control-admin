import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Usuario } from 'src/app/interface/usuario-interface';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.scss']
})
export class CadastrarUsuarioComponent {

  constructor(private usuarioService: UsuarioService,
    private toastrService: NbToastrService,private router:Router){

  }
  
  usuario: Usuario = {
    login: "",
    password:"",
    role: "",
    name: ""
  }

  create(){      

    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      response =>{
        this.toastrService.success("Usuário cadastrado com sucesso!", "Sucesso");
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cadastrar-usuario']); // Navega para a rota de cadastro de armazém
          });
        }, 1000); 

      },
      (error) => {
        console.log('Erro ao cadastrar usuário:', error);
        if (error.status === 403) {
          setTimeout(() => {
            location.reload(); // Recarrega a página após1 segundos
          }, 2000);
        } else {
          this.toastrService.danger('Erro ao cadastrar usuário.', 'Erro');
        }
 
    }
    )

}



}
