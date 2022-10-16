// https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/GetDadosPostoMapa?id=66075&f=json

export namespace PrecosCombustiveis {
    export type TipoCombustiveis = 'Gasóleo simples' | 'Gasóleo especial' | 'Gasolina simples 95' | 'Gasolina especial 98';

    export interface CombustivelDto {
        Preco: string; // "2,049 €/litro"
        TipoCombustivel: TipoCombustiveis;
    }

    export interface HorarioPostoDto {
        DiasUteis: string; // "05:20-01:20"
        Domingo: string;
        Feriado: string;
        Sabado: string;
    }

    export interface DadosPostoDto {
        Nome: string;
        Combustiveis: CombustivelDto[];
        DataAtualizacao: string; // "13-10-2022 12:00"
        HorarioPosto: HorarioPostoDto;
        Marca: string;
        MeiosPagamento: any;
        Morada: any;
        Servicos: any;
        TipoPosto: string;
    }
}
