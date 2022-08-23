import { Router, Request, Response } from 'express';
import centerController from '../controllers/centerController';
import centerService from '../services/centerService';

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

// router.get('/insertdata/:id', (req, res) => {
//   res.render('insertdata');
// });

router.get('/updatedata/:id', async (req, res) => {
  try {
    const data = await centerService.getOneChildCareCenter(req.params.id);
    // const { name, cellPhone, homePageUrl, childrenCount, startAt, use_naver_coord, address, lng, lat } = req.body;
    // const modifyChildCareCenter = await centerService.modifyChildCareCenter(req.params.id, req.body);
    // console.log(data);
    res.render('updatedata', { data } || {});
    // res.redirect(`/getonedata/${data._id}`);
    // return res.status(200).send('modify success');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
  //   // res.render('updatedata');
});
router.get('/saverecentdata', centerController.getRecentData);
router.get('/childcarecenterin', centerController.getNumberOfChildCareCenterIn);
router.get('/coordinates', centerController.getCenterInCoordinate);
router.get('/multipolygon', centerController.getCenterInMultiPolygon);
router.get('/getdata', centerController.getAllData);
router.get('/getonedata/:id', centerController.getOneData);
router.post('/addcenterdata', centerController.insertData);
router.post('/updatecenterdata/:id', centerController.updateData);
router.delete('/deletecenterdata/:id', centerController.deleteData);

export default router;
