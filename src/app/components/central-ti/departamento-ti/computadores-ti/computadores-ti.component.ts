import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalComputadoresTiComponent } from '../../modais/modais-ti/modal-computadores-ti/modal-computadores-ti.component';
import { ComputadoresService } from 'src/app/services/departamento-ti/computadores/computadores.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Computadores } from 'src/app/interface/computadores';
import { MatSort } from '@angular/material/sort';
import { ModalLogComputadoresComponent } from '../../modais/modais-ti/modal-log-computadores/modal-log-computadores.component';
import { LogComputadores } from 'src/app/interface/logComputadores';

interface ComputadoresWithStatus extends Computadores {
    isSucata?: boolean;
    isMatriz?: boolean;
    isFilial?: boolean;
    isErro?: boolean;
    isConserto?: boolean;
}

@Component({
    selector: 'app-computadores-ti',
    templateUrl: './computadores-ti.component.html',
    styleUrls: ['./computadores-ti.component.scss']
})
export class ComputadoresTiComponent {
    computadoresCompletos: Computadores[] = [];
    computadoresCompletosDTO: Computadores[] = [];
    dataSource = new MatTableDataSource<Computadores>(this.computadoresCompletos);
    displayedColumns: string[] = ['nomeComputador', 'userAtual', 'nomeUsuario', 'mac', 'localizacao', 'serial', 'acao'];

    chatDTO: LogComputadores = {
        message: "",
        userVinculado: "",
        macVinculado: "",
        computadorVinculado: "",
        datahora: "",
        nomeUser: ""
    }

    concluido: boolean = false;
    makro: boolean = false;


    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    constructor(public dialog: MatDialog, private toastrService: NbToastrService,
        private router: Router, private computadoresService: ComputadoresService,
    ) {
        this.getAllComputadores();
    }

    deletarComputador(computadores: Computadores) {
        this.computadoresService.deletarAtivos(computadores.enderecoMac).subscribe(
            response => {
                this.toastrService.success("Computador deletado com sucesso!", "Sucesso");
                setTimeout(() => {
                    location.reload(); // Recarrega a página após1 segundos
                }, 1000);
            },
            (error) => {
                console.log('Erro ao deletar computador:', error);
                if (error.status === 403) {
                    // setTimeout(() => {
                    //   location.reload(); // Recarrega a página após1 segundos
                    // }, 2000);
                } else {
                    this.toastrService.danger('Erro ao deletar computador.', 'Erro');
                }
            }
        )
    }

    openComputadores(computadoresCompleto: Computadores) {
        const dialogRef = this.dialog.open(ModalComputadoresTiComponent, { data: { computadoresCompleto: computadoresCompleto } });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result.computadoresCompleto}`);
        });
    }


    countIsMatriz: number = 0;
    countIsFilial: number = 0;
    countIsConserto: number = 0;
    countIsSucata: number = 0;

    loading: boolean = true;
    getAllComputadores() {
        this.computadoresService.getAllComputadores().subscribe(
            (data: Computadores[] | null) => {
                try {
                    if (!data) {
                        throw new Error('Array de computadores é nulo.');
                    }

                    data.sort((a, b) => a.nomeComputador.localeCompare(b.nomeComputador));

                    this.computadoresCompletos = [];
                    if (this.concluido) {
                        localStorage.setItem('concluido', this.concluido.toString());
                        this.computadoresCompletos = data.filter(computador => !computador.userAtual);
                    } else if (this.makro) {
                        localStorage.setItem('makro', this.makro.toString());
                        this.computadoresCompletos = data.filter(computador => computador.makroInstalado == "NÃO INSTALADO");
                    } else {
                        localStorage.removeItem('concluido');
                        localStorage.removeItem('makro');
                        this.computadoresCompletos = data;
                    }

                    // Adiciona ou remove a coluna 'status' com base na variável `concluido`
                    if (this.concluido) {
                        this.displayedColumns = ['status', 'nomeComputador', 'userAtual', 'nomeUsuario', 'mac', 'localizacao', 'serial', 'acao'];
                    } else {
                        this.displayedColumns = ['nomeComputador', 'userAtual', 'nomeUsuario', 'mac', 'localizacao', 'serial', 'acao'];
                    }

                    this.countIsMatriz = 0;  // Inicializa como número
                    this.countIsFilial = 0;  // Inicializa como número
                    this.countIsConserto = 0;  // Inicializa como número
                    this.countIsSucata = 0;  // Inicializa como número

                    // Processa cada computador para verificar a última mensagem
                    this.computadoresCompletos.forEach(computador => {
                        this.computadoresService.getChat(computador.enderecoMac).subscribe(
                            (messages: LogComputadores[]) => {
                                if (messages && messages.length > 0) {
                                    const lastMessage = messages[messages.length - 1]; // Pega a última mensagem
                                    // Adiciona dinamicamente a propriedade `isSucata` ao objeto `Computadores`
                                    const updatedComputador = computador as ComputadoresWithStatus;
                                    updatedComputador.isSucata = lastMessage.message === 'sucata';
                                    updatedComputador.isMatriz = lastMessage.message === 'matriz' || lastMessage.message === 'pronto';
                                    updatedComputador.isFilial = lastMessage.message === 'filial';
                                    updatedComputador.isErro = lastMessage.message === 'erro';
                                    updatedComputador.isConserto = lastMessage.message === 'conserto';

                                    if (updatedComputador.isMatriz) {
                                        this.countIsMatriz = Number(this.countIsMatriz) + 1;
                                    }

                                    if (updatedComputador.isFilial) {
                                        this.countIsFilial = Number(this.countIsFilial) + 1;
                                    }

                                    if (updatedComputador.isConserto) {
                                        this.countIsConserto = Number(this.countIsConserto) + 1;
                                    }

                                    if (updatedComputador.isSucata) {
                                        this.countIsSucata = Number(this.countIsSucata) + 1;
                                    }

                                } else {
                                    (computador as ComputadoresWithStatus).isSucata = false;
                                    (computador as ComputadoresWithStatus).isMatriz = false;
                                    (computador as ComputadoresWithStatus).isFilial = false;
                                    (computador as ComputadoresWithStatus).isErro = false;
                                    (computador as ComputadoresWithStatus).isConserto = false;
                                }


                                this.dataSource.data = [...this.computadoresCompletos];
                            },
                            (error) => {
                                console.error(`Erro ao buscar mensagens de chat para ${computador.nomeComputador}:`, error);
                                this.toastrService.danger('Erro ao buscar mensagens do chat', 'Erro');
                                const updatedComputador = computador as ComputadoresWithStatus;
                                updatedComputador.isSucata = false;
                                updatedComputador.isMatriz = false;
                                updatedComputador.isFilial = false;
                                updatedComputador.isErro = false;
                                updatedComputador.isConserto = false;

                                this.dataSource.data = [...this.computadoresCompletos];
                            }
                        );
                    });

                } catch (error) {
                    console.log('Erro ao filtrar computadores:', error);
                    this.toastrService.danger('Erro ao filtrar computadores.', 'Erro');
                } finally {
                    this.loading = false;
                }
            },
            (error) => {
                console.log('Erro ao obter computadores:', error);
                if (error.status === 403) {
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                } else {
                    this.toastrService.danger('Erro ao obter computadores.', 'Erro');
                }
                this.loading = false;
            }
        );
    }

    selectedFilter: string = '';
    selectFilter(event: any) {
        this.selectedFilter = event.target.value;
    }

    filterValue: string = '';

    ngOnInit() {
        // Recupera os valores do filtro do localStorage
        const storedSelectedFilter = localStorage.getItem('selectedFilter');
        const storedFilterValue = localStorage.getItem('filterValue');
        const storedMakro = localStorage.getItem('makro');
        const storedConcluido = localStorage.getItem('concluido');

        if (storedSelectedFilter) {
            this.selectedFilter = storedSelectedFilter;
        }

        if (storedFilterValue) {
            this.filterValue = storedFilterValue;
            this.applyFilterWithValue(this.filterValue);
        }

        if (storedMakro !== null) {
            this.makro = storedMakro === 'true';
        }

        if (storedConcluido !== null) {
            this.concluido = storedConcluido === 'true';
        }
    }

    applyFilter(event: any) {
        const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.applyFilterWithValue(filterValue);

        // Salva os valores no localStorage
        localStorage.setItem('selectedFilter', this.selectedFilter);
        localStorage.setItem('filterValue', filterValue);
    }

    applyFilterWithValue(filterValue: string) {
        const normalizedFilterValue = this.normalizeString(filterValue.toLowerCase());

        // Verifica se há um filtro selecionado
        if (this.selectedFilter) {
            // Aplica o filtro no campo selecionado
            this.dataSource.filter = normalizedFilterValue;
            this.dataSource.filterPredicate = (data: any, filter: string) => {
                const normalizedDataValue = this.getNormalizedFieldValue(data);
                return normalizedDataValue.includes(filter);
            };
        } else {
            // Se nenhum filtro estiver selecionado, limpa o filtro
            this.dataSource.filter = '';
        }
    }

    getNormalizedFieldValue(data: any): string {
        switch (this.selectedFilter) {
            case 'nomeUserAtual':
                return this.normalizeString(data.nomeUserAtual?.toLowerCase() ?? '');
            case 'nomeComputador':
                return this.normalizeString(data.nomeComputador.toLowerCase());
            case 'serial':
                return this.normalizeString(data.serial?.toLowerCase() ?? '');
            case 'marca':
                return this.normalizeString(data.marca.toLowerCase());
            case 'enderecoMac':
                return this.normalizeString(data.enderecoMac.toLowerCase());
            case 'localizacao':
                return this.normalizeString(data.localizacao.toLowerCase());
            case 'nomeLastUser':
                return this.normalizeString(data.nomeLastUser?.toLowerCase() ?? '');
            default:
                return ''; // Retorna uma string vazia se nenhum campo for selecionado
        }
    }

    normalizeString(str: string): string {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    openLog(computadoresCompleto: Computadores) {
        const dialogRef = this.dialog.open(ModalLogComputadoresComponent, { data: { computadoresCompleto: computadoresCompleto } });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result.computadoresCompleto}`);
        });
    }

}



