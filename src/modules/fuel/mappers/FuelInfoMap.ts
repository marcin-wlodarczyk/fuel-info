import {PrecosCombustiveis} from '../interfaces/PrecosCombustiveis';
import {FuelInfo} from '../interfaces/FuelInfo';
import {DateTime} from 'luxon';

const floatRegExp = /[+-]?([0-9]*[.])?[0-9]+/;

function toMoney(price: string): number {
    price = price.replace(',', '.');
    const floats = price.match(floatRegExp)?.map((v) => parseFloat(v)) as any as string[];
    return +floats[0];
}

export class FuelInfoMap {
    public static toDomain(info: PrecosCombustiveis.DadosPostoDto): FuelInfo {
        const diesel = info.Combustiveis.find((i) => i.TipoCombustivel === 'Gasóleo simples');
        const gasoline = info.Combustiveis.find((i) => i.TipoCombustivel === 'Gasolina simples 95');

        return {
            pricing: {
                diesel: toMoney(diesel!.Preco),
                gasoline: toMoney(gasoline!.Preco),
            },
            gasStation: {
                brand: info.Marca,
                name: info.Nome,
            },
            updatedAt: DateTime.fromFormat(info.DataAtualizacao, 'dd-MM-yyyy HH:mm', {zone: 'Europe/Lisbon'}),
        };
    }
}
