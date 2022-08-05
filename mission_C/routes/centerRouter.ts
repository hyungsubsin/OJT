import { Router, Request, Response } from 'express';
import centerController from '../controllers/centerController';

const router = Router();

router.get('/centerdata', centerController.getAllData);
router.post('/addcenterdata', centerController.insertData);
router.patch('/updatecenterdata/:id', centerController.updateData);

export default router;
