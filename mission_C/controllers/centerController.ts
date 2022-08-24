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
    const city: any = req.query.city;
    const number = await centerService.getNumberOfChildCareCenterIn(city);
    return res.status(200).send(`${city} 어린이집 갯수: ${number}`);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getCenterInCoordinate = async (req: Request, res: Response) => {
  try {
    const query: any = req.query;
    const lat = parseFloat(query.lat);
    const lng = parseFloat(query.lng);
    const distance = parseInt(query.distance);
    const coordinateData = await centerService.getCenterInCoordinate(lat, lng, distance);
    res.render('getdata', { coordinateData } || {});
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getCenterInMultiPolygon = async (req: Request, res: Response) => {
  try {
    const query: any = req.query;
    const multipolygonData = await centerService.getCenterInMultiPolygon(query.multipolygon);
    res.render('getdata', { multipolygonData } || {});
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getAllData = async (req: Request, res: Response) => {
  try {
    const data = await centerService.getChildCareCenter();
    res.render('getdata', { data });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getOneData = async (req: Request, res: Response) => {
  try {
    const data = await centerService.getOneChildCareCenter(req.params.id);
    res.render('data', { data } || {});
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
    const modifyChildCareCenter = await centerService.modifyChildCareCenter(req.params.id, req.body);
    res.redirect(`/getonedata/${data._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const getUpdateData = async (req: Request, res: Response) => {
  try {
    const data: any = await centerService.getOneChildCareCenter(req.params.id);
    res.render('updatedata', { data });
  } catch (err) {
    console.error(err);
    res.status(500).send;
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
  getUpdateData,
  deleteData,
};
