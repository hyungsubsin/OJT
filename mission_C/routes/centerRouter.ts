import { Router, Request, Response } from 'express';
import { rmSync } from 'fs';
import centerController from '../controllers/centerController';
import centerService from '../services/centerService';

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/insertdata', (req, res) => {
  res.render('insertdata');
});

router.get('/updatedata/:id', async (req, res) => {
  try {
    const data = await centerService.getOneChildCareCenter(req.params.id);
    res.render('updatedata', { data } || {});
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/regiondata', async (req, res) => {
  try {
    res.render('regiondata');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/coordinatedata', async (req, res) => {
  try {
    res.render('coordinatedata');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/multipolygon', async (req, res) => {
  try {
    res.render('multipolygon');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
router.get('/saverecentdata', centerController.getRecentData);
router.get('/childcarecenterin', centerController.getNumberOfChildCareCenterIn);
router.get('/coordinates', centerController.getCenterInCoordinate);
router.get('/multipolygondata', centerController.getCenterInMultiPolygon);
router.get('/getdata', centerController.getAllData);
router.get('/getonedata/:id', centerController.getOneData);
router.post('/addcenterdata', centerController.insertData);
router.post('/updatecenterdata/:id', centerController.updateData);
router.delete('/deletecenterdata/:id', centerController.deleteData);

export default router;
