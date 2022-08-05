import { Router, Request, Response } from 'express';
import centerController from '../controllers/centerController';

const router = Router();

router.get('/centerdata', centerController.getAllData);
router.post('/addcenterdata', centerController.insertData);
router.patch('/updatecenterdata/:id', centerController.updateData);
router.delete('/deletecenterdata/:id', centerController.deleteData);

export default router;
