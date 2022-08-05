import { Router } from 'express';
import centerRouter from './centerRouter';

const router = Router();

router.use('/childcarecenter', centerRouter);

export default router;
