import {Router} from 'express';
import {pricesRouter} from '../../../modules/fuel/infra';

const v1Routes = Router();

v1Routes.use('/prices', pricesRouter);

export {v1Routes};
