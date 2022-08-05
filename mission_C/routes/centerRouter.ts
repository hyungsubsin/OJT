import { Router, Request, Response } from 'express';
import centerController from '../controllers/centerController';

const router = Router();

router.get('/centerdata', centerController.getAllData);
router.post('/addcenterdata', centerController.insertData);

export default router;
