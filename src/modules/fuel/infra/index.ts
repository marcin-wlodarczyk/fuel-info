import {Router} from 'express';
import {getFuelPrices} from '../useCases/getFuelPrices';

const pricesRouter = Router();

pricesRouter.get('/', getFuelPrices);

export {pricesRouter};
