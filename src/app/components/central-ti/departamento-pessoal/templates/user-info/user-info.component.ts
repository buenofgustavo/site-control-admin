import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  template: `<nb-user [name]="name" [title]="title" nbContextMenuTag="my-context-menu"></nb-user>`
})
export class UserInfoComponent {
  @Input() name!: string;
  @Input() title!: string;
}