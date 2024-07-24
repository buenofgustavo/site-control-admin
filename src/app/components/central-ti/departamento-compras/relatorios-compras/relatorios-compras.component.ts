import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GestaoAtivos } from 'src/app/interface/gestaoAtivos';
import { Relatorios } from 'src/app/interface/relatorios';
import { ModalRelatoriosComponent } from '../../modais/modal-relatorios/modal-relatorios.component';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-relatorios-compras',
  templateUrl: './relatorios-compras.component.html',
  styleUrls: ['./relatorios-compras.component.scss']
})
export class RelatoriosComprasComponent {
  relatorios: Relatorios[] = [
    { id: 1, relatorios: 'Relatório de ativos por colaboradores e filiais' },
    { id: 2, relatorios: 'Relatório de notebooks por colaboradores e filiais' },
    { id: 3, relatorios: 'Relatório de notebooks inativos' },
    // Add more data as needed
  ];
  dataSource = new MatTableDataSource(this.relatorios);
  displayedColumns: string[] = ['relatorios', 'acoes'];
  loading: boolean = false;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    setTimeout(() => {
      this.dataSource.data = this.relatorios;
      this.loading = false;
    }, 2000);
  }

  openDialog(relatorios: Relatorios) {
    const dialogRef = this.dialog.open(ModalRelatoriosComponent, { data: { relatorios: relatorios } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result.relatorios}`);
    });
  }

  constructor(public dialog: MatDialog, private toastrService: NbToastrService, private router: Router) {
  }



}
