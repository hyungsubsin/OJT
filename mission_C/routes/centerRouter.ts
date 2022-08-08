import { Router, Request, Response } from 'express';
import centerController from '../controllers/centerController';

const router = Router();

router.post('/saverecentdata', centerController.getRecentData);
router.get('/childcarecenterin', centerController.getNumberOfChildCareCenterIn);
router.get('/coordinates', centerController.getCenterInCoordinate);
router.get('/multipolygon', centerController.getCenterInMultiPolygon);
router.get('/getcenterdata', centerController.getAllData);
router.post('/addcenterdata', centerController.insertData);
router.patch('/updatecenterdata/:id', centerController.updateData);
router.delete('/deletecenterdata/:id', centerController.deleteData);

export default router;
