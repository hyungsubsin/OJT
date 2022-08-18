import { Router, Request, Response } from 'express';
import centerController from '../controllers/centerController';

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});
// router.get('/getdata', (req, res) => {
//   res.render('getdata');
// });

router.get('/insertdata', (req, res) => {
  res.render('insertdata');
});

// router.get('/updatedata', (req, res) => {
//   res.render('updatedata');
// });
router.get('/saverecentdata', centerController.getRecentData);
router.get('/childcarecenterin', centerController.getNumberOfChildCareCenterIn);
router.get('/coordinates', centerController.getCenterInCoordinate);
router.get('/multipolygon', centerController.getCenterInMultiPolygon);
router.get('/getdata', centerController.getAllData);
router.get('/getonedata/:id', centerController.getOneData);
router.post('/addcenterdata', centerController.insertData);
router.get('/updatecenterdata/:id', centerController.updateData);
router.delete('/deletecenterdata/:id', centerController.deleteData);

export default router;
