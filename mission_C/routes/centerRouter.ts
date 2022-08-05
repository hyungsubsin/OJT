import { Router, Request, Response } from 'express';
import centerController from '../controllers/centerController';

const router = Router();

router.get('/centerdata', centerController.getAllData);

export default router;
