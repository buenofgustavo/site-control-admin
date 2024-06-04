import { Component } from '@angular/core';

@Component({
  selector: 'app-gestao-pessoal-ti',
  templateUrl: './gestao-pessoal-ti.component.html',
  styleUrls: ['./gestao-pessoal-ti.component.scss']
})
export class GestaoPessoalTiComponent {
  selectedOption: string = '';

  onChange(event: any) {
    event.preventDefault();
  }
}
