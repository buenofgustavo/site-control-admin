import { Component } from '@angular/core';
import { NbOverlayContainer, NbOverlayRef } from '@nebular/theme';
 
@Component({
  selector: 'app-gestao-pessoal',
  templateUrl: './gestao-pessoal.component.html',
  styleUrls: ['./gestao-pessoal.component.scss']
})
export class GestaoPessoalComponent {
  selectedOption: string = '';

  onChange(event: any) {
    event.preventDefault();
  }
}

