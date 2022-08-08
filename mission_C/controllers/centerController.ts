import { Router, Request, Response } from 'express';
import centerService from '../services/centerService';
import { ChildcarecenterDTO } from '../../interfaces/childcarecenter';
import { request } from 'http';

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
    return res.json(data).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
const insertData = async (req: Request, res: Response) => {
  try {
    const addChildCareCenter = await centerService.addChildCareCenter(req.body as ChildcarecenterDTO);
    return res.json(req.body).status(201);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

const updateData = async (req: Request, res: Response) => {
  try {
    const modifyChildCareCenter = await centerService.modifyChildCareCenter(req.params.id, req.body.data);
    return res.status(200).send('modify success');
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
  insertData,
  updateData,
  deleteData,
};
