import { Router, Request, Response } from 'express';
import centerService from '../services/centerService';
import { ChildcarecenterDTO } from '../../interfaces/Childcarecenter';

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

export default { getAllData, insertData };
