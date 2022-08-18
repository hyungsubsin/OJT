import { Router, Request, Response } from 'express';
import centerService from '../services/centerService';
import { ChildcarecenterDTO } from '../../interfaces/childcarecenter';

const getRecentData = async (req: Request, res: Response) => {
  try {
    const data = await centerService.getRecentData();
    return res.status(200).send('data saved');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getNumberOfChildCareCenterIn = async (req: Request, res: Response) => {
  try {
    const number = await centerService.getNumberOfChildCareCenterIn(req.body.city);
    return res.status(200).send(`서울시 어린이집 갯수: ${number}`);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getCenterInCoordinate = async (req: Request, res: Response) => {
  try {
    const lat = parseFloat(req.body.lat);
    const lng = parseFloat(req.body.lng);
    const distance = parseInt(req.body.distance);
    const data = await centerService.getCenterInCoordinate(lat, lng, distance);
    return res.json(data).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getCenterInMultiPolygon = async (req: Request, res: Response) => {
  try {
    const data = await centerService.getCenterInMultiPolygon(req.body.multiPolygon);
    return res.json(data).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getAllData = async (req: Request, res: Response) => {
  try {
    const data = await centerService.getChildCareCenter();
    res.render('getdata', { data });
    // console.log('hello');
    // return res.json(data).status(200);
  } catch (err) {
    console.error(err);
    // res.status(500).send();
  }
};

const getOneData = async (req: Request, res: Response) => {
  try {
    const data = await centerService.getOneChildCareCenter(req.params.id);
    res.render('data', { data } || {});
    // return res.json(data).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
const insertData = async (req: Request, res: Response) => {
  try {
    const { name, cellPhone, homePageUrl, childrenCount, startAt, use_naver_coord, address, lng, lat } = req.body;
    const addChildCareCenter = await centerService.addChildCareCenter(req.body as ChildcarecenterDTO);
    return res.json(req.body).status(201);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const updateData = async (req: Request, res: Response) => {
  try {
    const data: any = await centerService.getOneChildCareCenter(req.params.id);
    const { name, cellPhone, homePageUrl, childrenCount, startAt, use_naver_coord, address, lng, lat } = req.body;
    const modifyChildCareCenter = await centerService.modifyChildCareCenter(req.params.id, req.body.data);
    res.render('updatedata', { data } || {});
    res.redirect(`/getonedata/${data._id}`);
    // return res.status(200).send('modify success');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const deleteData = async (req: Request, res: Response) => {
  try {
    const deleteChildCareCenter = await centerService.deleteChildCareCenter(req.params.id);
    return res.status(200).send('delete success');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

export default {
  getRecentData,
  getNumberOfChildCareCenterIn,
  getCenterInCoordinate,
  getCenterInMultiPolygon,
  getAllData,
  getOneData,
  insertData,
  updateData,
  deleteData,
};
