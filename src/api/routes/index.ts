import { Router } from 'express';
import centerRouter from './centerRouter';

const router = Router();

router.use('/', centerRouter);

export default router;
