import {Request, Response} from 'express';
import axios from 'axios';
import {PrecosCombustiveis} from '../../interfaces/PrecosCombustiveis';
import {FuelInfoMap} from '../../mappers/FuelInfoMap';
import {FuelInfo} from '../../interfaces/FuelInfo';

const ids = {
    bpVilaReal: 66075,
};

interface GasStation {
    id: number;
    name: string;
    city: string;
    mapsUrl: string;
}

const gasStations: GasStation[] = [
    {
        id: 66075,
        name: 'BP (Roundabout)',
        city: 'Vila Real',
        mapsUrl: 'https://goo.gl/maps/i4CQbWmNQkkJ7Yd37',
    },
    {
        id: 69190,
        name: 'CEPSA',
        city: 'Vila Real',
        mapsUrl: 'https://goo.gl/maps/5etTnC8qQ59QShSg9',
    },
    {
        id: 86711,
        name: 'Intermarche',
        city: 'Vila Real',
        mapsUrl: 'https://goo.gl/maps/n29DLM73jx9bKZCq9',
    },
    {
        id: 76106,
        name: 'Auchan',
        city: 'Vila Real',
        mapsUrl: 'https://goo.gl/maps/ifaiekWEzAwxWNQw5',
    },
    {
        id: 66103,
        name: 'BP (Lordelo)',
        city: 'Vila Real',
        mapsUrl: 'https://goo.gl/maps/SAG6d6t9HLe7Csfr8',
    },
    {
        id: 77558,
        name: 'Intermarche',
        city: 'Mirandela',
        mapsUrl: 'https://goo.gl/maps/kUJ4D9wZVstop6fw9',
    },
    {
        id: 65861,
        name: 'Prio (Cantarias)',
        city: 'Braganca',
        mapsUrl: 'https://goo.gl/maps/WXJ14a1WXtc7Eiku6',
    },
    {
        id: 65862,
        name: 'BP (Sao Lazaro)',
        city: 'Braganca',
        mapsUrl: 'https://goo.gl/maps/tLvBuSQxCfLXttkn7',
    },
];

export async function getFuelPrices(req: Request, res: Response): Promise<any> {
    const requests = gasStations.map((gs) => {
        return Promise.all([
            gs,
            axios.get(`https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/GetDadosPostoMapa?id=${gs.id}&f=json`),
        ]);
    });
    const responses = await Promise.all(requests);

    const tuples: [GasStation, FuelInfo][] = [];
    for (const [gs, {data}] of responses) {
        const info = FuelInfoMap.toDomain(data.resultado as PrecosCombustiveis.DadosPostoDto);
        tuples.push([gs, info]);
    }


    tuples.sort(([gsA, infoA], [gsB, infoB]) => {
        if (gsA.city === gsB.city) {
            return infoA.pricing.diesel - infoB.pricing.diesel;
        }
        return gsA.city.localeCompare(gsB.city);
    });

    const cities: { [city: string]: [GasStation, FuelInfo][] } = {};
    for (const tuple of tuples) {
        const city = tuple[0].city;
        if (!cities[city]) {
            cities[city] = [tuple];
        } else {
            cities[city].push(tuple);
        }
    }

    return res.render('index', {data: cities});
}
