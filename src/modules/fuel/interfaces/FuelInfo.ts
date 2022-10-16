import {DateTime} from 'luxon';

interface FuelPricing {
    diesel: number;
    gasoline: number;
}

export interface FuelInfo {
    gasStation: {
        name: string;
        brand: string;
    };
    pricing: FuelPricing;
    updatedAt: DateTime;
}
