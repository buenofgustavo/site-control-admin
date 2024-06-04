import { Acessos } from "./acessos";
import { Computadores } from "./computadores";
import { DadosColaboradores } from "./dados-colaboradores";

export interface ColaboradorCompleto {
    colaboradoresDTO: DadosColaboradores;
    acessosDTO: Acessos;
    computadoresDTO: Computadores;
}